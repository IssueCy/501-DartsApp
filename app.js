let players = [];

window.onload = () => {
    if (!localStorage.getItem("players")) {
        localStorage.setItem("players", players)
    } else {
        localStorage.getItem("players").split() //TODO load players in ls and in dom
    }
};

function quitApp() {
    window.close();
}

let addPlayer_button = document.getElementById('addPlayer_button');
let create_player_container = document.getElementById('createPlayersContainer');
let players_container = document.getElementById('players-container');
let confirmAddPlayer_button = document.getElementById('confirmAddPlayer_button');

if (addPlayer_button) {
    addPlayer_button.addEventListener('click', () => {
        addPlayer_button.style.display = "none";
        create_player_container.style.display = "flex";
    });
}

if (confirmAddPlayer_button) {
    function confirmAddPlayer() {
        //TODO      - localstorage  - displays
        let inputField = document.getElementById('name_input_field');
        let newName = inputField.value;

        
    }
}

function startGame() {

}