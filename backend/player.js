async function loadPlayerData() {
    const params = new URLSearchParams(window.location.search);
    const playerId = params.get('id');

    const response = await fetch(`/api/characters/${playerId}`);
    const player = await response.json();

    document.querySelector('.username span').innerText = player.name;
    document.querySelector('.stat-bars .level-progress-bar').style.width = `${player.hp}%`;
    // Další dynamické úpravy...
}

window.onload = loadPlayerData;