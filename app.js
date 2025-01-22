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
                    container.style.backgroundColor = 'lightblue';
                    container.style.border = '2px solid orange';
                } else {
                    container.style.backgroundColor = '';
                    container.style.border = '';
                }
            });
        } 

        let playerContainers = [];

        participants.forEach((player) => {
            let playerContainer = document.createElement('div');
            playerContainer.id = "player-container";
            playerContainer.textContent = player;
            scores_container.appendChild(playerContainer);
            playerContainers.push(playerContainer);
        });

        let currentPlayerIndex = 0;
        highlightCurrentPlayer(currentPlayerIndex);

        document.getElementById('enter-button').addEventListener('click', () => {
            if (displayContainer.innerText.length <= 3) {
                if (displayContainer.innerText == "") {
                    currentPlayerIndex = (currentPlayerIndex + 1) % participants.length;
                    highlightCurrentPlayer(currentPlayerIndex);
                } else {
                    let score = displayContainer.innerText;
                    playerContainers[currentPlayerIndex].innerText += `\n${score}`;            
                    displayContainer.innerHTML = "";
                      
                    currentPlayerIndex = (currentPlayerIndex + 1) % participants.length;
                    highlightCurrentPlayer(currentPlayerIndex);
                }
            } else {
                alert("Error: invalid score entered");
                displayContainer.innerHTML = "";
            }
        });

        document.getElementById('delete-button').addEventListener('click', () => {
            displayContainer.innerHTML = "";
        });

        document.querySelectorAll('.number-button').forEach(button => {
            button.addEventListener('click', () => {
                displayContainer.innerHTML += button.getAttribute('data-value');
            });
        });
        

    }
};

function quitApp() {
    if (window.location.href.endsWith("game-panel.html")) {
        window.location.href = "index.html";
    } else {
        window.close();
    }
}

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