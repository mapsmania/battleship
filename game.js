// Noughts and Crosses (Tic-Tac-Toe) Game Logic with SignalR + WebRTC
class NoughtsAndCrossesGame {
    constructor() {
        this.gameId = '';
        this.playerName = '';
        this.isHost = false;
        this.gameStarted = false;
        this.myTurn = false;
        this.connected = false;
        this.myUserId = Math.floor(Math.random() * 10000) + 1; // Random user ID
        this.opponentUserId = null;

        // --- Game State (Changed for Noughts and Crosses) ---
        this.board = Array(9).fill(null); // 3x3 board
        this.myMark = null; // 'X' or 'O'
        this.gameOver = false;

        // --- WebRTC and SignalR Properties (Unchanged) ---
        this.peerConnection = null;
        this.dataChannel = null;
        this.signalRConnection = null;

        this.setupSignalR();
    }

    // ===================================================================
    // NETWORKING & COMMUNICATION LOGIC (This section is mostly unchanged)
    // ===================================================================

    async setupSignalR() {
        try {
            console.log('Setting up SignalR connection...');
            const hubUrl = `https://api.tripgeo.com/teamhub?userid=${this.myUserId}&teamid=noughts_temp`;

            this.signalRConnection = new signalR.HubConnectionBuilder()
                .withUrl(hubUrl)
                .withAutomaticReconnect()
                .build();

            this.signalRConnection.on("WebRTCPeerJoined", (userName, userId) => {
                console.log('WebRTC Peer joined:', userName, userId);
                if (userId !== this.myUserId && !this.connected) {
                    this.opponentUserId = userId;
                    if (this.isHost) {
                        this.updateStatus(`${userName} joined. Establishing connection...`);
                        this.createOffer();
                    }
                }
            });

            this.signalRConnection.on("WebRTCSignalingMessageReceived", (fromUserId, messageType, messageData) => {
                console.log('WebRTC signaling received:', messageType, 'from', fromUserId);
                if (fromUserId !== this.myUserId) {
                    this.opponentUserId = fromUserId;
                    this.handleSignalingMessage(messageType, messageData);
                }
            });

            this.signalRConnection.on("WebRTCPeerLeft", (userId) => {
                console.log('WebRTC Peer left:', userId);
                if (userId === this.opponentUserId) {
                    this.updateStatus('Opponent disconnected. Game ended.');
                    this.gameOver = true;
                }
            });

            await this.signalRConnection.start();
            console.log('SignalR connected successfully');
            this.updateStatus('Connected. Ready to create or join a game.');

        } catch (error) {
            console.error('SignalR setup failed:', error);
            this.updateStatus('Failed to connect to server. Please refresh.');
        }
    }

    async sendSignalingMessage(messageType, messageData) {
        if (this.signalRConnection &&
            this.signalRConnection.state === signalR.HubConnectionState.Connected &&
            this.opponentUserId) {
            try {
                await this.signalRConnection.invoke("SendWebRTCSignalingMessage",
                    this.opponentUserId.toString(), messageType, messageData);
            } catch (error) {
                console.error('Error sending signaling message:', error);
            }
        }
    }

    async handleSignalingMessage(messageType, messageData) {
        switch (messageType) {
            case 'offer': await this.handleOffer(messageData); break;
            case 'answer': await this.handleAnswer(messageData); break;
            case 'ice-candidate': await this.handleIceCandidate(messageData); break;
        }
    }

    async createPeerConnection() {
        this.peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        });

        if (this.isHost) {
            this.dataChannel = this.peerConnection.createDataChannel('gameChannel', { ordered: true });
            this.setupDataChannel(this.dataChannel);
        }

        this.peerConnection.ondatachannel = (event) => {
            this.dataChannel = event.channel;
            this.setupDataChannel(this.dataChannel);
        };

        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.sendSignalingMessage('ice-candidate', event.candidate);
            }
        };

        this.peerConnection.onconnectionstatechange = () => {
            console.log('Connection state:', this.peerConnection.connectionState);
            if (this.peerConnection.connectionState === 'connected') {
                this.connected = true;
                if (!this.gameStarted) {
                     this.initializeGame();
                }
            }
        };
    }

    setupDataChannel(channel) {
        channel.onopen = () => {
            console.log('Data channel opened');
            this.connected = true;
            if (!this.gameStarted) {
                this.initializeGame();
            }
        };
        channel.onmessage = (event) => {
            this.handleGameMessage(JSON.parse(event.data));
        };
        channel.onerror = (error) => {
            console.error('Data channel error:', error);
            this.updateStatus('Connection error.');
        };
    }

    async createOffer() {
        await this.createPeerConnection();
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        await this.sendSignalingMessage('offer', offer);
    }

    async handleOffer(offer) {
        await this.createPeerConnection();
        await this.peerConnection.setRemoteDescription(offer);
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        await this.sendSignalingMessage('answer', answer);
    }

    async handleAnswer(answer) {
        await this.peerConnection.setRemoteDescription(answer);
    }

    async handleIceCandidate(candidate) {
        if (this.peerConnection) {
            await this.peerConnection.addIceCandidate(candidate);
        }
    }

    sendGameMessage(type, data) {
        if (this.dataChannel && this.dataChannel.readyState === 'open') {
            this.dataChannel.send(JSON.stringify({ type, data }));
        }
    }

    // ===================================================================
    // GAME LOGIC (This section is all new for Noughts and Crosses)
    // ===================================================================

    handleGameMessage(message) {
        console.log('Game message:', message.type);
        switch (message.type) {
            case 'ready':
                this.handlePlayerReady();
                break;
            case 'move':
                this.handleIncomingMove(message.data);
                break;
            case 'restart':
                this.resetBoard();
                break;
        }
    }
    
    initializeGame() {
        document.getElementById('connectionPanel').classList.add('hidden');
        document.getElementById('gameArea').classList.remove('hidden');
        document.getElementById('restartBtn').classList.remove('hidden');
        
        this.gameStarted = true;
        this.myMark = this.isHost ? 'X' : 'O';
        this.myTurn = this.isHost;

        this.renderBoard();
        this.updateStatus('Connected! Waiting for opponent to be ready...');
        this.sendGameMessage('ready', {});
    }

    handlePlayerReady() {
        if (this.myTurn) {
            this.updateStatus(`Game started! You are "${this.myMark}". Your turn!`);
        } else {
            this.updateStatus(`Game started! You are "${this.myMark}". Opponent's turn.`);
        }
    }

    renderBoard() {
        const boardElement = document.getElementById('gameBoard');
        boardElement.innerHTML = '';

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            const mark = this.board[i];
            if (mark) {
                cell.classList.add(mark);
                cell.textContent = mark;
            }
            
            if (this.myTurn && !this.gameOver && !this.board[i]) {
                cell.style.cursor = 'pointer';
                cell.addEventListener('click', () => this.makeMove(i));
            } else {
                cell.style.cursor = 'default';
            }
            boardElement.appendChild(cell);
        }
    }

    makeMove(index) {
        if (!this.myTurn || this.gameOver || this.board[index] !== null) return;

        this.board[index] = this.myMark;
        this.myTurn = false;
        this.renderBoard();
        this.sendGameMessage('move', { index });

        const winner = this.checkWinner();
        if (winner) {
            this.handleGameOver(winner);
        } else {
            this.updateStatus("Opponent's turn...");
        }
    }

    handleIncomingMove(data) {
        const opponentMark = this.myMark === 'X' ? 'O' : 'X';
        this.board[data.index] = opponentMark;
        this.myTurn = true;
        this.renderBoard();

        const winner = this.checkWinner();
        if (winner) {
            this.handleGameOver(winner);
        } else {
            this.updateStatus('Your turn!');
        }
    }

    checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return this.board[a]; // Returns 'X' or 'O'
            }
        }

        if (this.board.every(cell => cell !== null)) {
            return 'draw';
        }

        return null; // No winner yet
    }

    handleGameOver(winner) {
        this.gameOver = true;
        this.myTurn = false;
        if (winner === 'draw') {
            this.updateStatus("It's a draw!");
        } else if (winner === this.myMark) {
            this.updateStatus('Congratulations, you won!');
        } else {
            this.updateStatus('You lost. Better luck next time!');
        }
    }
    
    restartGame() {
        this.sendGameMessage('restart', {});
        this.resetBoard();
    }
    
    resetBoard() {
        this.board = Array(9).fill(null);
        this.gameOver = false;
        this.myTurn = this.isHost;
        this.renderBoard();
        if(this.myTurn) {
            this.updateStatus("Board reset. Your turn!");
        } else {
            this.updateStatus("Board reset. Opponent's turn.");
        }
    }

    updateStatus(message) {
        document.getElementById('gameStatus').textContent = message;
    }
}

// Global game instance
let game = null;

async function createGame() {
    const gameId = document.getElementById('gameIdInput').value.trim();
    const playerName = document.getElementById('playerNameInput').value.trim();
    if (!gameId || !playerName) { alert('Please enter both Game ID and your name'); return; }

    game = new NoughtsAndCrossesGame();
    game.gameId = gameId;
    game.playerName = playerName;
    game.isHost = true;

    const waitForConnection = async () => {
        if (game.signalRConnection && game.signalRConnection.state === signalR.HubConnectionState.Connected) {
            try {
                await game.signalRConnection.invoke("JoinWebRTCSession", `noughts_${gameId}`, game.myUserId);
                game.updateStatus(`Game "${gameId}" created. Share the ID!`);
            } catch (error) {
                console.error('Error creating game:', error);
                game.updateStatus('Error creating game.');
            }
        } else {
            setTimeout(waitForConnection, 100);
        }
    };
    await waitForConnection();

    document.getElementById('createGameBtn').disabled = true;
    document.getElementById('joinGameBtn').disabled = true;
    document.getElementById('restartBtn').addEventListener('click', () => game.restartGame());
}

async function joinGame() {
    const gameId = document.getElementById('gameIdInput').value.trim();
    const playerName = document.getElementById('playerNameInput').value.trim();
    if (!gameId || !playerName) { alert('Please enter both Game ID and your name'); return; }

    game = new NoughtsAndCrossesGame();
    game.gameId = gameId;
    game.playerName = playerName;
    game.isHost = false;

    const waitForConnection = async () => {
        if (game.signalRConnection && game.signalRConnection.state === signalR.HubConnectionState.Connected) {
            try {
                await game.signalRConnection.invoke("JoinWebRTCSession", `noughts_${gameId}`, game.myUserId);
                game.updateStatus(`Joining game "${gameId}"...`);
            } catch (error) {
                console.error('Error joining game:', error);
                game.updateStatus('Error joining game.');
            }
        } else {
            setTimeout(waitForConnection, 100);
        }
    };
    await waitForConnection();

    document.getElementById('createGameBtn').disabled = true;
    document.getElementById('joinGameBtn').disabled = true;
    document.getElementById('restartBtn').addEventListener('click', () => game.restartGame());
}
