
    const MAX_ROUNDS = 10; // Define the maximum number of rounds

    class StreetViewGame {
      constructor() {
        this.roomId = null;
        this.userName = null;
        this.myUserId = Math.floor(Math.random() * 10000) + 1;
        this.isHost = false;
        this.map = null;
        this.myMarker = null;
        this.peerMarkers = {};
        this.guesses = {};
        this.currentProperty = null;
        this.signalRConnection = null;
        this.opponentUserId = null;
        this.correctMarker = null;
        this.myGuessSubmitted = false;

        // 🆕 Add properties for round management
        this.currentRound = 0; // The current round number (1 to MAX_ROUNDS)
        this.playerScores = {}; // To store scores across rounds
        this.roundHistory = []; // 🆕 Stores winner/info for each round

        this.initializeMap();
      }

      initializeMap() {
        this.map = new maplibregl.Map({
          container: 'map',
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [-30, 30],
          zoom: 1.4
        });
        // Added a crucial line here to fix a map rendering issue when moving 
        // from a hidden state (or size change) to visible/resized.
        this.map.on('load', () => this.map.resize());
        this.map.on('click', e => this.placeOrMoveMyMarker(e.lngLat.lng, e.lngLat.lat));
      }

      placeOrMoveMyMarker(lng, lat) {
        if (this.currentRound === 0) {
          this.updateStatus('Game not started. Wait for another player or for the host to start the first round.');
          return;
        }
        if (this.myGuessSubmitted) {
          this.updateStatus(this.getRoundStatus('Guess locked. Waiting for the opponent.'));
          return;
        }

        if (!this.myMarker) {
          this.myMarker = new maplibregl.Marker({
              color: '#00796b'
            })
            .setLngLat([lng, lat])
            .setPopup(new maplibregl.Popup({
              offset: 12
            }).setText(this.userName || 'You'))
            .addTo(this.map);
          this.myMarker.togglePopup();
        }

        this.myGuessSubmitted = true;
        const guessData = {
          userId: this.myUserId,
          userName: this.userName,
          lng,
          lat
        };
        this.guesses[this.myUserId] = guessData;

        this.sendMapData('guess-submit', guessData);
        // 🛠️ Update status to include round number
        this.updateStatus(this.getRoundStatus('Guess submitted. Waiting for the opponent...'));

        if (this.isHost && Object.keys(this.guesses).length === 2) {
          this.calculateWinner();
        }
      }

      async connectToTripgeoHub() {
        if (this.signalRConnection) return;

        const hubUrl = `https://api.tripgeo.com/teamhub?userid=${this.myUserId}&teamid=shared_map_temp`;
        this.signalRConnection = new signalR.HubConnectionBuilder()
          .withUrl(hubUrl)
          .withAutomaticReconnect()
          .build();

        this.signalRConnection.on('WebRTCPeerJoined', (userName, userId) => {
          if (userId !== this.myUserId) {
            this.opponentUserId = userId;
            // 🛠️ The host starts the *first* round when an opponent joins
            if (this.isHost) {
              this.updateStatus(`${userName} joined. Starting first round...`);
              this.startNewRound(); // 🆕 Call startNewRound
            } else {
              this.updateStatus(`${userName} joined. Waiting for host to start the game...`);
            }
          }
        });

        this.signalRConnection.on('WebRTCSignalingMessageReceived', (fromUserId, type, data) => {
          if (fromUserId === this.myUserId) return;

          // 🛠️ Check for 'game-end' message
          if (type === 'game-over') this.showResults(data);
          else if (type === 'game-end') this.endGame(data);
          // 🛠️ The client receives 'round-start' to know which round it is
          else if (type === 'round-start') this.startRound(data);
          else if (type === 'guess-submit') this.handleGuessSubmission(data);
        });

        await this.signalRConnection.start();
        this.updateStatus('Connected to TripGeo hub.');
      }

      // 🆕 Helper function to get the status message with the current round
      getRoundStatus(msg) {
        if (this.currentRound === 0) return msg;
        return `Round ${this.currentRound} (of ${MAX_ROUNDS}) - ${msg}`;
      }

      // 🆕 New function: Host-only call to advance round and load painting
      async startNewRound() {
        if (!this.isHost) return;

        this.currentRound++;

        // ⛔ Game End Check ⛔
        if (this.currentRound > MAX_ROUNDS) {
          this.endGameAsHost();
          return;
        }

        // Load and show the painting
        await this.loadRandomPainting();

        // Notify the client of the new round and painting data
        const roundData = {
          currentRound: this.currentRound,
          painting: this.currentProperty
        };
        await this.signalRConnection.invoke('SendWebRTCSignalingMessage', this.opponentUserId.toString(), 'round-start', roundData);
      }

      // 🆕 New function: Client and Host receive this to start a round
      startRound(data) {
        this.currentRound = data.currentRound;
        this.showPainting(data.painting);
      }

      async loadRandomPainting() {
        try {
          if (typeof paintingLocations === 'undefined' || !paintingLocations.length) {
            this.updateStatus('No painting locations available. Check paintings.js.');
            return;
          }

          const painting = paintingLocations[Math.floor(Math.random() * paintingLocations.length)];
          this.currentProperty = painting;

          // Only the host calls showPainting *after* receiving painting data from startRound
          if (this.isHost || this.currentRound === 1) { // 🛠️ Host can call showPainting immediately, or client on round 1
            this.showPainting(painting);
          }
        } catch (err) {
          console.error(err);
          this.updateStatus('Failed to load painting data.');
        }
      }

      showPainting(painting) {
        this.currentProperty = painting;

        const BASE_IMAGE_URL = 'https://mapsmania.github.io/backdrop/';
        const imgHtml = `
          <img 
            src="${BASE_IMAGE_URL}${painting.imageUrl}"
            alt="${painting.name}" 
            onclick="this.requestFullscreen()" 
            title="${painting.name}" 
            width="400">
          <p>${painting.name} ${painting.details}</p>
        `;
        document.getElementById('imageViewContainer').innerHTML = imgHtml;
        // 🛠️ Update status to include round number
        this.updateStatus(this.getRoundStatus('Look at the painting above and click on the map to place your guess.'));

        this.guesses = {};
        this.myGuessSubmitted = false;
        if (this.myMarker) {
          this.myMarker.remove();
          this.myMarker = null;
        }
        if (this.correctMarker) {
          this.correctMarker.remove();
          this.correctMarker = null;
        }
        Object.values(this.peerMarkers).forEach(m => m.remove());
        this.peerMarkers = {};
      }

      sendMapData(type, data) {
        if (!this.signalRConnection || !this.opponentUserId) return;
        this.signalRConnection.invoke('SendWebRTCSignalingMessage', this.opponentUserId.toString(), type, data).catch(console.error);
      }

      handleGuessSubmission(data) {
        if (data.userId !== this.myUserId) {
          const popup = new maplibregl.Popup({
            offset: 12,
            closeButton: false
          }).setText(data.userName || 'Peer');
          this.peerMarkers[data.userId] = new maplibregl.Marker({
              color: '#d9534f'
            })
            .setLngLat([data.lng, data.lat])
            .setPopup(popup)
            .addTo(this.map);
          this.peerMarkers[data.userId].togglePopup();
          this.guesses[data.userId] = {
            lng: data.lng,
            lat: data.lat,
            userName: data.userName
          };
        }

        // 🛠️ Update status to include round number
        this.updateStatus(
          this.getRoundStatus(`${data.userName} has submitted their guess. Waiting for ${Object.keys(this.guesses).length === 1 ? 'you' : 'host calculation'}...`)
        );

        if (this.isHost && Object.keys(this.guesses).length === 2) {
          this.calculateWinner();
        }
      }

      calculateWinner() {
        if (!this.currentProperty || Object.keys(this.guesses).length < 2) return;

        const correctLat = this.currentProperty.lat;
        const correctLng = this.currentProperty.lng;

        let winnerId = null,
          minDistance = Infinity;
        const results = {};

        // 🆕 Initialize scores if they don't exist
        Object.keys(this.guesses).forEach(uid => {
          if (!this.playerScores[uid]) {
            this.playerScores[uid] = {
              score: 0,
              userName: this.guesses[uid].userName
            };
          }
        });

        Object.keys(this.guesses).forEach(uid => {
          const g = this.guesses[uid];
          const d = this.calculateDistance(correctLat, correctLng, g.lat, g.lng);
          results[uid] = {
            distance: d,
            userName: g.userName
          };
          if (d < minDistance) {
            minDistance = d;
            winnerId = uid;
          }
        });

        // 🆕 Award point to winner
        if (winnerId) {
          this.playerScores[winnerId].score += 1;
        }

        // 🆕 RECORD ROUND HISTORY
        const roundResult = {
          round: this.currentRound,
          winnerId: winnerId,
          winnerName: this.playerScores[winnerId].userName,
          paintingName: this.currentProperty.name,
          paintingUrl: this.currentProperty.imageUrl,
          distances: Object.keys(this.guesses).map(uid => ({
            userName: this.guesses[uid].userName,
            distance: this.calculateDistance(correctLat, correctLng, this.guesses[uid].lat, this.guesses[uid].lng)
          }))
        };
        this.roundHistory.push(roundResult);
        // END RECORD ROUND HISTORY

        results.correctLocation = {
          lat: correctLat,
          lng: correctLng
        };
        results.winnerId = winnerId;
        // 🆕 Include scores in results
        results.currentScores = this.playerScores;

        this.sendMapData('game-over', results);
        this.showResults(results);
      }

      showResults(results) {
        const {
          correctLocation: {
            lat: clat,
            lng: clng
          },
          winnerId,
          currentScores // 🆕 Destructure scores
        } = results;

        this.correctMarker = new maplibregl.Marker({
            color: '#00cc00'
          })
          .setLngLat([clng, clat])
          .setPopup(new maplibregl.Popup({
            offset: 12
          }).setText('Correct Location'))
          .addTo(this.map);
        this.correctMarker.togglePopup();

        this.map.flyTo({
          center: [clng, clat],
          zoom: 6
        });

        let msg = `Round Over! The correct location is marked in <strong>green</strong>. <strong>${results[winnerId].userName}</strong> wins!`;
        Object.keys(results).forEach(uid => {
          if (uid !== 'correctLocation' && uid !== 'winnerId' && uid !== 'currentScores') {
            const km = (results[uid].distance / 1000).toFixed(2);
            msg += ` | <strong>${results[uid].userName}</strong> was <strong>${km} km</strong> away.`;
          }
        });

        // 🆕 Display current scores
        let scoreMsg = ' | Current Scores: ';
        Object.values(currentScores).forEach(player => {
          scoreMsg += `<strong>${player.userName}</strong>: ${player.score} - `;
        });
        msg += scoreMsg.slice(0, -3); // Remove the trailing ' - '

        // 🛠️ Update status to include round number
        this.updateStatus(this.getRoundStatus(msg));

        // ⬇️ Auto-start next round after 5 seconds (host only)
        if (this.isHost) {
          setTimeout(() => {
            this.updateStatus(this.getRoundStatus('Starting a new round...'));
            this.startNewRound(); // 🛠️ Call startNewRound instead of loadRandomPainting
          }, 5000);
        }
      }

      // 🆕 New function: Host-only call to end the game
      endGameAsHost() {
        // 🛠️ Pass the round history along with the final scores
        const finalResults = {
          finalScores: this.playerScores,
          roundHistory: this.roundHistory
        };
        this.sendMapData('game-end', finalResults);
        this.endGame(finalResults);
      }

      // 🆕 New function: End the game for all players
      endGame(data) {
        const {
          finalScores,
          roundHistory
        } = data; // 🛠️ Destructure roundHistory

        let finalMessage = `Game Over! The final score after ${MAX_ROUNDS} rounds is: `;
        let winningScore = -1;
        let winnerName = 'No one';

        Object.values(finalScores).forEach(player => {
          finalMessage += `<strong>${player.userName}</strong>: ${player.score}, `;
          if (player.score > winningScore) {
            winningScore = player.score;
            winnerName = player.userName;
          } else if (player.score === winningScore) {
            winnerName = 'A tie'; // Handle ties
          }
        });

        finalMessage = finalMessage.slice(0, -2); // Remove trailing comma and space
        finalMessage += `. The winner is <strong>${winnerName}</strong> with ${winningScore} points! 🏆`;

        // 🆕 GENERATE HTML FOR ROUND RESULTS
        let resultsHtml = `
            <h2>Final Standings</h2>
            <p>${finalMessage}</p>
            <h3 style="color:#00796b; margin-top: 1rem;">Round-by-Round Breakdown</h3>
            <table style="width:100%; border-collapse: collapse; text-align: left; font-size: 0.9em;">
                <thead>
                    <tr style="background-color: #f0f0f0;">
                        <th style="padding: 8px; border: 1px solid #ddd;">Round</th>
                        <th style="padding: 8px; border: 1px solid #ddd;">Painting</th>
                        <th style="padding: 8px; border: 1px solid #ddd;">Round Winner</th>
                        <th style="padding: 8px; border: 1px solid #ddd;">Distances (km)</th>
                    </tr>
                </thead>
                <tbody>
        `;

        roundHistory.forEach(r => {
          // Check if r.distances is available and map distances
          const distanceText = Array.isArray(r.distances) ? r.distances.map(d =>
            `${d.userName}: ${(d.distance / 1000).toFixed(1)}`
          ).join(' | ') : 'N/A';

          resultsHtml += `
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">${r.round}</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${r.paintingName || 'Unknown'}</td>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">${r.winnerName || 'N/A'}</td>
                    <td style="padding: 8px; border: 1px solid #ddd; font-size: 0.85em;">${distanceText}</td>
                </tr>
            `;
        });

        resultsHtml += `
                </tbody>
            </table>
        `;
        // END GENERATE HTML

        document.getElementById('imageViewContainer').innerHTML = resultsHtml; // 🛠️ Show the table
        this.updateStatus(finalMessage);

        // Clean up for a new game, including round history
        this.currentRound = 0;
        this.playerScores = {};
        this.roundHistory = []; // 🛠️ Reset round history
        if (this.myMarker) {
          this.myMarker.remove();
          this.myMarker = null;
        }
        if (this.correctMarker) {
          this.correctMarker.remove();
          this.correctMarker = null;
        }
        Object.values(this.peerMarkers).forEach(m => m.remove());
        this.peerMarkers = {};
      }

      calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3;
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) ** 2 +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      }

      updateStatus(msg) {
        document.getElementById('gameStatus').innerHTML = msg;
      }
    }

    const game = new StreetViewGame();

    async function createSession() {
      const room = document.getElementById('roomIdInput').value.trim();
      const name = document.getElementById('userNameInput').value.trim();
      if (!room || !name) {
        alert('Enter room and name');
        return;
      }
      game.roomId = room;
      game.userName = name;
      game.isHost = true;
      await game.connectToTripgeoHub();
      await game.signalRConnection.invoke('JoinWebRTCSession', `map_${room}`, game.myUserId);
      game.updateStatus(`Room "${room}" created. Waiting for players...`);
      document.getElementById('createRoomBtn').disabled = true;
      document.getElementById('joinRoomBtn').disabled = true;
    }

    async function joinSession() {
      const room = document.getElementById('roomIdInput').value.trim();
      const name = document.getElementById('userNameInput').value.trim();
      if (!room || !name) {
        alert('Enter room and name');
        return;
      }
      game.roomId = room;
      game.userName = name;
      game.isHost = false;
      await game.connectToTripgeoHub();
      await game.signalRConnection.invoke('JoinWebRTCSession', `map_${room}`, game.myUserId);
      game.updateStatus(`Joining room "${room}"...`);
      document.getElementById('createRoomBtn').disabled = true;
      document.getElementById('joinRoomBtn').disabled = true;
    }

