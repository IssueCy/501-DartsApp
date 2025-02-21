let addPlayer_button = document.getElementById('addPlayer_button');
let create_player_container = document.getElementById('createPlayersContainer');
let confirmAddPlayer_button = document.getElementById('confirmAddPlayer_button');

let players = [];

window.onload = () => {
    if (window.location.pathname.endsWith('index.html')) {
        const players_container = document.getElementById('players-container');

        if (!localStorage.getItem("players")) {
            localStorage.setItem("players", JSON.stringify(players));
        } else {
            players = JSON.parse(localStorage.getItem("players"));

            players.forEach(player => {
                const playerElement = document.createElement('div');
                playerElement.classList.add('playerElementContainer');

                const playerName = document.createElement('span');
                playerName.textContent = player;

                const addPlayerToParticipantList_tick = document.createElement('input');
                addPlayerToParticipantList_tick.type = "checkbox";

                const deletePlayerFromParticipantList_button = document.createElement('button');
                const deleteIcon = document.createElement('img');
                deleteIcon.src = 'img/trashcan.webp';
                deleteIcon.alt = "Delete";
                deletePlayerFromParticipantList_button.addEventListener('click', () => {
                    playerElement.remove();

                    const playerIndex = players.indexOf(player);
                    if (playerIndex > -1) {
                        players.splice(playerIndex, 1);
                    }

                    localStorage.setItem("players", JSON.stringify(players));
                });

                deletePlayerFromParticipantList_button.appendChild(deleteIcon);

                playerElement.appendChild(addPlayerToParticipantList_tick);
                playerElement.appendChild(playerName);
                playerElement.appendChild(deletePlayerFromParticipantList_button);
                players_container.appendChild(playerElement);
            });
        }
    } else if (window.location.pathname.endsWith('game-panel.html')) {
        const scores_container = document.getElementById('scores-container');
        const displayContainer = document.getElementById('displayContainer');
        const participants = JSON.parse(localStorage.getItem('participants') || '[]');

        function highlightCurrentPlayer(index) {
            const scoresContainer_iterate = document.querySelectorAll('#player-container');
            scoresContainer_iterate.forEach((container, i) => {
                if (i === index) {
                    container.style.outline = '4px solid red';
                } else {
                    container.style.outline = '';
                }
            });
        }

        let playerContainers = [];
        let playerScores = {};
        let currentPlayerIndex = 0;
        let previousPlayerIndex = 0;

        participants.forEach((player) => {
            let playerContainer = document.createElement('div');
            playerContainer.id = "player-container";

            let nameContainer = document.createElement('div');
            nameContainer.id = "name-container";
            nameContainer.textContent = player;

            let scoreContainer = document.createElement('div');
            scoreContainer.id = "score-container";
            scoreContainer.textContent = "501";

            playerContainer.appendChild(nameContainer);
            playerContainer.appendChild(scoreContainer);
            scores_container.appendChild(playerContainer);

            playerContainers.push({ playerContainer, nameContainer, scoreContainer });
            playerScores[player] = 501;
        });

        highlightCurrentPlayer(currentPlayerIndex);

        let previousScores = {};
        let returnedToLastPlayer = false;

        document.getElementById('enter-button').addEventListener('click', () => {
            if (displayContainer.innerText.length <= 3 && Number(displayContainer.innerText <= 180)) {
                if (displayContainer.innerText == "") {
                    previousPlayerIndex = currentPlayerIndex;
                    currentPlayerIndex = (currentPlayerIndex + 1) % participants.length;
                    highlightCurrentPlayer(currentPlayerIndex);
                } else {
                    let score = parseInt(displayContainer.innerText, 10);
                    let currentPlayer = participants[currentPlayerIndex];
                    
                    // Store the previous score
                    previousScores[currentPlayer] = playerScores[currentPlayer];
                    
                    playerScores[currentPlayer] -= score;
        
                    let { nameContainer, scoreContainer } = playerContainers[currentPlayerIndex];
                    nameContainer.textContent = currentPlayer;
                    scoreContainer.textContent = playerScores[currentPlayer];
        
                    displayContainer.innerHTML = "";
        
                    previousPlayerIndex = currentPlayerIndex;
                    currentPlayerIndex = (currentPlayerIndex + 1) % participants.length;
                    highlightCurrentPlayer(currentPlayerIndex);
                }
            } else {
                alert("Error: invalid score entered");
                displayContainer.innerHTML = "";
            }
        });
        
        document.querySelectorAll('.number-button').forEach(button => {
            button.addEventListener('click', () => {
                displayContainer.innerHTML += button.getAttribute('data-value');
            });
        });
        
        function returnToLastPlayer() {
            currentPlayerIndex = previousPlayerIndex;
            highlightCurrentPlayer(currentPlayerIndex);
            returnedToLastPlayer = true;
        }
        
        document.getElementById('returnToLastPlayer').addEventListener('click', returnToLastPlayer);        
        
        document.getElementById('delete-button').addEventListener('click', () => {
            if (returnedToLastPlayer) {
                let currentPlayer = participants[currentPlayerIndex];
                
                if (playerScores[currentPlayer] === 501) {
                    console.log("Player's score is still 501, nothing to delete.");
                    displayContainer.innerHTML = "";
                    return;
                }
                
                if (previousScores[currentPlayer] !== undefined) {
                    playerScores[currentPlayer] = previousScores[currentPlayer];
                    
                    let { nameContainer, scoreContainer } = playerContainers[currentPlayerIndex];
                    nameContainer.textContent = currentPlayer;
                    scoreContainer.textContent = playerScores[currentPlayer];
                    
                    returnedToLastPlayer = false;
                }
            }
            displayContainer.innerHTML = "";
        });
    }
};

if (addPlayer_button) {
    addPlayer_button.addEventListener('click', () => {
        addPlayer_button.style.display = "none";
        create_player_container.style.display = "flex";
    });
}

if (confirmAddPlayer_button) {
    function confirmAddPlayer() {
        const players_container = document.getElementById('players-container');
        let inputField = document.getElementById('name_input_field');
        let newName = inputField.value.trim();

        if (newName) {
            players.push(newName);

            localStorage.setItem("players", JSON.stringify(players));

            const playerElement = document.createElement('div');
            playerElement.classList.add('playerElementContainer');

            const playerName = document.createElement('span');
            playerName.textContent = newName;

            const addPlayerToParticipantList_tick = document.createElement('input');
            addPlayerToParticipantList_tick.type = "checkbox";

            const deletePlayerFromParticipantList_button = document.createElement('button');
            const deleteIcon = document.createElement('img');
            deleteIcon.src = 'img/trashcan.webp';
            deleteIcon.alt = "Delete";
            deletePlayerFromParticipantList_button.appendChild(deleteIcon);

            playerElement.appendChild(addPlayerToParticipantList_tick);
            playerElement.appendChild(playerName);
            playerElement.appendChild(deletePlayerFromParticipantList_button);
            players_container.appendChild(playerElement);

            inputField.value = "";
            addPlayer_button.style.display = "block";
            create_player_container.style.display = "none";
        }
    }
}

function startGame() {
    let checkboxes = document.querySelectorAll('.playerElementContainer input[type="checkbox"]');
    let participants = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const playerName = checkbox.parentElement.querySelector('span').textContent;
            participants.push(playerName);
        }
    });

    console.log('Participants: ', participants + '\n' + 'Length: ' + participants.length);

    if (participants.length >= 2 && participants.length <= 6) {
        localStorage.setItem('participants', JSON.stringify(participants));
        window.location.href = "game-panel.html";
    } else {
        alert("FEHLER: Es müssen mindestens 2 und maximal 6 Spieler ausgewählt sein.");
    }
}

function quitGame() {
    if (confirm("Willst du die aktuelle Sitzung abbrechen?")) {
        window.location.href = "index.html";
    } else {
        return;
    }
}