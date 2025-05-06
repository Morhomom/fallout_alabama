async function loadCharacters() {
    const response = await fetch('/api/characters'); // Volání backendového API
    const characters = await response.json();

    const characterContainer = document.querySelector('.character-selection');
    characterContainer.innerHTML = ''; // Vyčistí obsah

    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.className = 'character';
        characterDiv.innerHTML = `
            <img src="assets/${character.id.toLowerCase()}.webp" alt="${character.name}" onclick="selectRole('${character.id}')">
            <p>${character.name}</p>
        `;
        characterContainer.appendChild(characterDiv);
    });
}

function selectRole(characterId) {
    window.location.href = `player.html?id=${characterId}`;
}

window.onload = loadCharacters;