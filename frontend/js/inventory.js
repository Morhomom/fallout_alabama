// Načtení inventáře z backendu
async function loadInventory() {
    const playerId = localStorage.getItem('selectedRole');
    if (!playerId) {
        console.error('No player ID found in localStorage');
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`/api/characters?id=${playerId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch inventory data');
        }

        const player = await response.json();

        // Zobrazení inventáře na stránce
        const inventoryList = document.querySelector('.inventory-list');
        inventoryList.innerHTML = ''; // Vyčistí seznam

        player.inventory.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            inventoryList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error loading inventory:', error);
    }
}

// Spustíme funkci po načtení stránky
window.onload = loadInventory;