// Battleship Game Logic with proper SignalR + WebRTC
class BattleshipGame
{
    constructor()
    {
        this.gameId = '';
        this.playerName = '';
        this.isHost = false;
        this.gameStarted = false;
        this.myTurn = false;
        this.connected = false;
        this.myUserId = Math.floor(Math.random() * 10000) + 1; // Random user ID
        this.opponentUserId = null;

        // Game state
        this.playerGrid = Array(10).fill().map(() => Array(10).fill(0));
        this.enemyGrid = Array(10).fill().map(() => Array(10).fill(0));
        this.playerShips = [];
        this.enemyShips = [];

        // Ship types: [length, count]
        this.shipTypes = [
            [5, 1], // Carrier
            [4, 1], // Battleship  
            [3, 2], // Cruiser
            [2, 1]  // Destroyer
        ];

        // WebRTC connection
        this.peerConnection = null;
        this.dataChannel = null;

        // SignalR connection
        this.signalRConnection = null;

        this.setupSignalR();
    }

    // Proper SignalR setup using your TeamHub
    async setupSignalR()
    {
        try
        {
            console.log('Setting up SignalR connection...');

            // Connect to your TeamHub with proper SignalR client
            // const hubUrl = `https://localhost:7209/teamhub?userid=${this.myUserId}&teamid=battleship_temp`;
            // or ....

            const hubUrl = `https://api.tripgeo.com/teamhub?userid=${this.myUserId}&teamid=battleship_temp`;

            this.signalRConnection = new signalR.HubConnectionBuilder()
                .withUrl(hubUrl)
                .withAutomaticReconnect()
                .build();

            // Set up SignalR event handlers for WebRTC
            this.signalRConnection.on("WebRTCPeerJoined", (userName, userId) =>
            {
                console.log('WebRTC Peer joined:', userName, userId);
                if (userId !== this.myUserId && !this.connected)
                {
                    this.opponentUserId = userId;
                    if (this.isHost)
                    {
                        this.updateStatus(`${userName} joined. Establishing connection...`);
                        this.createOffer();
                    }
                }
            });

            this.signalRConnection.on("WebRTCSignalingMessageReceived", (fromUserId, messageType, messageData) =>
            {
                console.log('WebRTC signaling received:', messageType, 'from', fromUserId);
                if (fromUserId !== this.myUserId)
                {
                    this.opponentUserId = fromUserId;
                    this.handleSignalingMessage(messageType, messageData);
                }
            });

            this.signalRConnection.on("WebRTCPeerLeft", (userId) =>
            {
                console.log('WebRTC Peer left:', userId);
                if (userId === this.opponentUserId)
                {
                    this.updateStatus('Opponent disconnected. Game ended.');
                }
            });

            // Start the SignalR connection
            await this.signalRConnection.start();
            console.log('SignalR connected successfully');
            this.updateStatus('Connected to server. Ready to create or join game.');

        } catch (error)
        {
            console.error('SignalR setup failed:', error);
            this.updateStatus('Failed to connect to server. Please refresh and try again.');
        }
    }

    async sendSignalingMessage(messageType, messageData)
    {
        if (this.signalRConnection &&
            this.signalRConnection.state === signalR.HubConnectionState.Connected &&
            this.opponentUserId)
        {
            try
            {
                console.log(`Sending ${messageType} to user ${this.opponentUserId}`);
                await this.signalRConnection.invoke("SendWebRTCSignalingMessage",
                    this.opponentUserId.toString(), messageType, messageData);
            } catch (error)
            {
                console.error('Error sending signaling message:', error);
            }
        }
    }

    async handleSignalingMessage(messageType, messageData)
    {
        console.log('Handling signaling message:', messageType);

        switch (messageType)
        {
            case 'offer':
                await this.handleOffer(messageData);
                break;

            case 'answer':
                await this.handleAnswer(messageData);
                break;

            case 'ice-candidate':
                await this.handleIceCandidate(messageData);
                break;
        }
    }

    async createPeerConnection()
    {
        this.peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        });

        // Create data channel for game messages
        if (this.isHost)
        {
            this.dataChannel = this.peerConnection.createDataChannel('battleship', {
                ordered: true
            });
            this.setupDataChannel(this.dataChannel);
        }

        // Handle incoming data channel
        this.peerConnection.ondatachannel = (event) =>
        {
            this.dataChannel = event.channel;
            this.setupDataChannel(this.dataChannel);
        };

        // Handle ICE candidates
        this.peerConnection.onicecandidate = (event) =>
        {
            if (event.candidate)
            {
                this.sendSignalingMessage('ice-candidate', event.candidate);
            }
        };

        // Connection state monitoring
        this.peerConnection.onconnectionstatechange = () =>
        {
            console.log('Connection state:', this.peerConnection.connectionState);
            if (this.peerConnection.connectionState === 'connected')
            {
                this.connected = true;
                this.updateStatus('Connected! Setting up your fleet...');
                this.initializeGame();
            }
        };
    }

    setupDataChannel(channel)
    {
        channel.onopen = () =>
        {
            console.log('Data channel opened');
            this.connected = true;
            if (!this.gameStarted)
            {
                this.initializeGame();
            }
        };

        channel.onmessage = (event) =>
        {
            this.handleGameMessage(JSON.parse(event.data));
        };

        channel.onerror = (error) =>
        {
            console.error('Data channel error:', error);
            this.updateStatus('Connection error. Please refresh and try again.');
        };
    }

    async createOffer()
    {
        await this.createPeerConnection();
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        await this.sendSignalingMessage('offer', offer);
    }

    async handleOffer(offer)
    {
        await this.createPeerConnection();
        await this.peerConnection.setRemoteDescription(offer);
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        await this.sendSignalingMessage('answer', answer);
    }

    async handleAnswer(answer)
    {
        await this.peerConnection.setRemoteDescription(answer);
    }

    async handleIceCandidate(candidate)
    {
        if (this.peerConnection)
        {
            await this.peerConnection.addIceCandidate(candidate);
        }
    }

    sendGameMessage(type, data)
    {
        if (this.dataChannel && this.dataChannel.readyState === 'open')
        {
            this.dataChannel.send(JSON.stringify({ type, data }));
        }
    }

    handleGameMessage(message)
    {
        console.log('Game message:', message.type);

        switch (message.type)
        {
            case 'ready':
                this.handlePlayerReady();
                break;
            case 'shot':
                this.handleIncomingShot(message.data);
                break;
            case 'shot-result':
                this.handleShotResult(message.data);
                break;
            case 'game-over':
                this.handleGameOver(message.data);
                break;
        }
    }

    // Game Logic
    initializeGame()
    {
        this.generateRandomShips();
        this.renderPlayerGrid();
        this.renderEnemyGrid();

        document.getElementById('connectionPanel').classList.add('hidden');
        document.getElementById('gameArea').classList.remove('hidden');

        this.updateStatus('Fleet deployed! Waiting for opponent...');
        this.sendGameMessage('ready', { playerName: this.playerName });
    }

    generateRandomShips()
    {
        this.playerGrid = Array(10).fill().map(() => Array(10).fill(0));
        this.playerShips = [];

        for (const [length, count] of this.shipTypes)
        {
            for (let i = 0; i < count; i++)
            {
                this.placeRandomShip(length);
            }
        }
    }

    placeRandomShip(length)
    {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 100)
        {
            const horizontal = Math.random() < 0.5;
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);

            if (this.canPlaceShip(row, col, length, horizontal))
            {
                const ship = [];
                for (let i = 0; i < length; i++)
                {
                    const r = horizontal ? row : row + i;
                    const c = horizontal ? col + i : col;
                    this.playerGrid[r][c] = 1; // 1 = ship
                    ship.push([r, c]);
                }
                this.playerShips.push(ship);
                placed = true;
            }
            attempts++;
        }
    }

    canPlaceShip(row, col, length, horizontal)
    {
        for (let i = 0; i < length; i++)
        {
            const r = horizontal ? row : row + i;
            const c = horizontal ? col + i : col;

            if (r >= 10 || c >= 10 || this.playerGrid[r][c] !== 0)
            {
                return false;
            }

            // Check surrounding cells
            for (let dr = -1; dr <= 1; dr++)
            {
                for (let dc = -1; dc <= 1; dc++)
                {
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr >= 0 && nr < 10 && nc >= 0 && nc < 10 && this.playerGrid[nr][nc] !== 0)
                    {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    renderPlayerGrid() {
    const grid = document.getElementById('playerGrid');
    grid.innerHTML = '';

    // Render water + hits + misses as before
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;

            const value = this.playerGrid[row][col];
            if (value === 2) cell.textContent = '💥';
            else if (value === 3) cell.textContent = '💧';
            else if (value === 4) cell.textContent = '💀';

            grid.appendChild(cell);
        }
    }

    // Now draw ships as images
    const cellSize = 40; // match CSS grid cell size
    for (const ship of this.playerShips) {
        // Determine orientation
        const horizontal = ship[0][0] === ship[1][0]; // same row = horizontal
        const length = ship.length;

        const top = ship[0][0] * cellSize;
        const left = ship[0][1] * cellSize;

        const img = document.createElement('img');
        img.src = 'frigate.png';
        img.className = 'ship-image';

        if (horizontal) {
            img.style.width = (length * cellSize) + 'px';
            img.style.height = cellSize + 'px';
            img.style.transform = 'rotate(0deg)';
        } else {
            img.style.width = cellSize + 'px';
            img.style.height = (length * cellSize) + 'px';
            img.style.transform = 'rotate(0deg)';
        }

        img.style.top = top + 'px';
        img.style.left = left + 'px';

        grid.appendChild(img);
    }
}

    renderEnemyGrid()
    {
        const grid = document.getElementById('enemyGrid');
        grid.innerHTML = '';

        for (let row = 0; row < 10; row++)
        {
            for (let col = 0; col < 10; col++)
            {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                const value = this.enemyGrid[row][col];
                if (value === 2) cell.classList.add('hit');
                else if (value === 3) cell.classList.add('miss');
                else if (value === 4) cell.classList.add('sunk');

                if (value === 2) cell.textContent = '💥';
                else if (value === 3) cell.textContent = '💧';
                else if (value === 4) cell.textContent = '💀';

                // Add click handler for shooting
                if (this.myTurn && value === 0)
                {
                    cell.addEventListener('click', () => this.makeShot(row, col));
                    cell.style.cursor = 'crosshair';
                }

                grid.appendChild(cell);
            }
        }
    }

    handlePlayerReady()
    {
        if (this.gameStarted) return;

        this.gameStarted = true;
        this.myTurn = this.isHost; // Host goes first

        if (this.myTurn)
        {
            this.updateStatus('Game started! Your turn - click on enemy waters to fire!');
        } else
        {
            this.updateStatus('Game started! Opponent\'s turn - wait for them to fire!');
        }

        this.renderEnemyGrid();
    }

    makeShot(row, col)
    {
        if (!this.myTurn || this.enemyGrid[row][col] !== 0) return;

        this.updateStatus('Firing torpedo... 🚀');
        this.sendGameMessage('shot', { row, col });
        this.myTurn = false;
        this.lastShotRow = row;
        this.lastShotCol = col;
    }

    handleIncomingShot(shot)
    {
        const { row, col } = shot;
        const hit = this.playerGrid[row][col] === 1;

        if (hit)
        {
            this.playerGrid[row][col] = 2; // Hit

            // Check if ship is sunk
            const sunkShip = this.checkShipSunk(row, col);
            if (sunkShip)
            {
                sunkShip.forEach(([r, c]) => this.playerGrid[r][c] = 4);
            }

            // Check if all ships are sunk (game over)
            const allSunk = this.playerShips.every(ship =>
                ship.every(([r, c]) => this.playerGrid[r][c] === 4)
            );

            this.sendGameMessage('shot-result', {
                hit: true,
                sunk: !!sunkShip,
                gameOver: allSunk
            });

            if (allSunk)
            {
                this.updateStatus('💀 Game Over! You lost!');
                return;
            }
        } else
        {
            this.playerGrid[row][col] = 3; // Miss
            this.sendGameMessage('shot-result', { hit: false });
        }

        this.renderPlayerGrid();

        if (!hit)
        {
            this.myTurn = true;
            this.updateStatus('Enemy missed! Your turn!');
            this.renderEnemyGrid();
        } else
        {
            this.updateStatus('Enemy hit your ship! They get another turn!');
        }
    }

    handleShotResult(result)
    {
        const row = this.lastShotRow;
        const col = this.lastShotCol;

        if (result.hit)
        {
            this.enemyGrid[row][col] = result.sunk ? 4 : 2;

            if (result.gameOver)
            {
                this.updateStatus('🎉 Congratulations! You won!');
                return;
            } else if (result.sunk)
            {
                this.updateStatus('💥 You sunk their ship! Fire again!');
            } else
            {
                this.updateStatus('💥 Direct hit! Fire again!');
            }

            this.myTurn = true;
        } else
        {
            this.enemyGrid[row][col] = 3;
            this.updateStatus('💧 Miss! Opponent\'s turn...');
            this.myTurn = false;
        }

        this.renderEnemyGrid();
    }

    checkShipSunk(hitRow, hitCol)
    {
        for (const ship of this.playerShips)
        {
            if (ship.some(([r, c]) => r === hitRow && c === hitCol))
            {
                // Check if all parts of this ship are hit
                if (ship.every(([r, c]) => this.playerGrid[r][c] >= 2))
                {
                    return ship;
                }
                break;
            }
        }
        return null;
    }

    updateStatus(message)
    {
        document.getElementById('gameStatus').textContent = message;
    }
}

// Global game instance
let game = null;

async function createGame()
{
    const gameId = document.getElementById('gameIdInput').value.trim();
    const playerName = document.getElementById('playerNameInput').value.trim();

    if (!gameId || !playerName)
    {
        alert('Please enter both Game ID and your name');
        return;
    }

    game = new BattleshipGame();
    game.gameId = gameId;
    game.playerName = playerName;
    game.isHost = true;

    // Wait for SignalR to connect, then join WebRTC session
    const waitForConnection = async () =>
    {
        if (game.signalRConnection && game.signalRConnection.state === signalR.HubConnectionState.Connected)
        {
            try
            {
                // Join WebRTC session using your existing TeamHub method
                await game.signalRConnection.invoke("JoinWebRTCSession", `battleship_${gameId}`, game.myUserId);
                game.updateStatus(`Game "${gameId}" created. Share this Game ID with your opponent!`);
            } catch (error)
            {
                console.error('Error creating game:', error);
                game.updateStatus('Error creating game. Please try again.');
            }
        } else
        {
            setTimeout(waitForConnection, 100);
        }
    };

    await waitForConnection();

    document.getElementById('createGameBtn').disabled = true;
    document.getElementById('joinGameBtn').disabled = true;
}

async function joinGame()
{
    const gameId = document.getElementById('gameIdInput').value.trim();
    const playerName = document.getElementById('playerNameInput').value.trim();

    if (!gameId || !playerName)
    {
        alert('Please enter both Game ID and your name');
        return;
    }

    game = new BattleshipGame();
    game.gameId = gameId;
    game.playerName = playerName;
    game.isHost = false;

    // Wait for SignalR to connect, then join WebRTC session
    const waitForConnection = async () =>
    {
        if (game.signalRConnection && game.signalRConnection.state === signalR.HubConnectionState.Connected)
        {
            try
            {
                // Join WebRTC session using your existing TeamHub method
                await game.signalRConnection.invoke("JoinWebRTCSession", `battleship_${gameId}`, game.myUserId);
                game.updateStatus(`Joining game "${gameId}"...`);
            } catch (error)
            {
                console.error('Error joining game:', error);
                game.updateStatus('Error joining game. Please try again.');
            }
        } else
        {
            setTimeout(waitForConnection, 100);
        }
    };

    await waitForConnection();

    document.getElementById('createGameBtn').disabled = true;
    document.getElementById('joinGameBtn').disabled = true;
}
