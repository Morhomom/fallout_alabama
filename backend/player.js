async function loadPlayerData() {
    // Načtení ID postavy z localStorage
    const playerId = localStorage.getItem('selectedRole');
    if (!playerId) {
        console.error('No player ID found in localStorage');
        return;
    }

    try {
        // Načtení dat postavy z backendu
        const response = await fetch(`/api/characters/${playerId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch player data');
        }

        const player = await response.json();

        // Aktualizace DOM s daty postavy
        document.querySelector('.username span').innerText = player.name;
        document.querySelector('.stat-footer .col-3:first-child').innerText = `HP ${player.hp}/${player.hp}`;
        document.querySelector('.stat-footer .col-3:last-child').innerText = `AP ${player.ap}/${player.ap}`;
        document.querySelector('.level-progress-bar-footer').style.width = `${player.hp}%`;
    } catch (error) {
        console.error('Error loading player data:', error);
    }
}

// Spustíme funkci po načtení stránky
window.onload = loadPlayerData;

async function updatePlayerStatus(playerId, newStatus) {
    try {
        const response = await fetch(`/api/characters/${playerId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStatus),
        });

        if (!response.ok) {
            throw new Error('Failed to update player status');
        }

        const updatedPlayer = await response.json();
        console.log('Player status updated:', updatedPlayer);

        // Aktualizace DOM s novými daty
        document.querySelector('.stat-footer .col-3:first-child').innerText = `HP ${updatedPlayer.hp}/${updatedPlayer.hp}`;
        document.querySelector('.stat-footer .col-3:last-child').innerText = `AP ${updatedPlayer.ap}/${updatedPlayer.ap}`;
        document.querySelector('.level-progress-bar-footer').style.width = `${updatedPlayer.hp}%`;
    } catch (error) {
        console.error('Error updating player status:', error);
    }
}

// Příklad použití: Aktualizace HP na 80
updatePlayerStatus('Engineer', { hp: 80 });

async function addItemToInventory(playerId, item) {
    try {
        const response = await fetch(`/api/characters/${playerId}/inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item }),
        });

        if (!response.ok) {
            throw new Error('Failed to add item to inventory');
        }

        const updatedPlayer = await response.json();
        console.log('Item added to inventory:', updatedPlayer.inventory);
    } catch (error) {
        console.error('Error adding item to inventory:', error);
    }
}

// Příklad použití: Přidání předmětu "Laser Rifle"
addItemToInventory('Engineer', 'Laser Rifle');

async function removeItemFromInventory(playerId, itemId) {
    try {
        const response = await fetch(`/api/characters/${playerId}/inventory/${itemId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to remove item from inventory');
        }

        const updatedPlayer = await response.json();
        console.log('Item removed from inventory:', updatedPlayer.inventory);
    } catch (error) {
        console.error('Error removing item from inventory:', error);
    }
}

// Příklad použití: Odebrání předmětu s ID 0
removeItemFromInventory('Engineer', 0);