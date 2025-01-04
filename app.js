let addPlayer_button = document.getElementById('addPlayer_button');
let create_player_container = document.getElementById('createPlayersContainer');
let confirmAddPlayer_button = document.getElementById('confirmAddPlayer_button');

let players = [];

window.onload = () => {
    const players_container = document.getElementById('players-container');
    if (!localStorage.getItem("players")) {
        localStorage.setItem("players", JSON.stringify(players))
    } else {
        players = JSON.parse(localStorage.getItem("players"));
        
        players.forEach(player => {

            //? display the names in the player container
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
};

function quitApp() {
    window.close();
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
            
            //? display the names in the player container
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

}