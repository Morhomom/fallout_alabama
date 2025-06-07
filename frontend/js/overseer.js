function updateStat(player, stat, value) {
  const playerData = JSON.parse(localStorage.getItem(player)) || {};
  playerData[stat] = value;
  localStorage.setItem(player, JSON.stringify(playerData));
}

function applyEffect(player) {
  alert(`Používáte efekt na ${player}`);
  // Implementace efektu
}

// Načtení seznamu hráčů
async function loadPlayers() {
    try {
        const response = await fetch('/api/characters');
        if (!response.ok) {
            throw new Error('Failed to fetch player list');
        }

        const players = await response.json();
        renderPlayerList(players);
    } catch (error) {
        console.error('Error loading players:', error);
    }
}

// Vykreslení seznamu hráčů
function renderPlayerList(players) {
    const playerList = document.getElementById('player-list');
    playerList.innerHTML = ''; // Vyčistí seznam

    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-item';
        playerDiv.innerHTML = `
            <h3>${player.name}</h3>
            <p>HP: <span>${player.hp}</span></p>
            <p>AP: <span>${player.ap}</span></p>
            <p>Currency: <span>${player.currency}</span></p>
            <p data-stat="strength">STR: <span>${player.strength}</span></p>
            <p data-stat="perception">PER: <span>${player.perception}</span></p>
            <p data-stat="endurance">END: <span>${player.endurance}</span></p>
            <p data-stat="charisma">CHA: <span>${player.charisma}</span></p>
            <p data-stat="intelligence">INT: <span>${player.intelligence}</span></p>
            <p data-stat="agility">AGI: <span>${player.agility}</span></p>
            <p data-stat="luck">LCK: <span>${player.luck}</span></p>
            <button onclick="editPlayer('${player.id}')">Edit</button>
        `;
        playerList.appendChild(playerDiv);
    });
}

// Otevření formuláře pro úpravu hráče
function editPlayer(playerId) {
    const playerDiv = document.querySelector(`.player-item button[onclick="editPlayer('${playerId}')"]`).parentElement;
    const hp = playerDiv.querySelector('p:nth-child(2) span').innerText;
    const ap = playerDiv.querySelector('p:nth-child(3) span').innerText;
    const currency = playerDiv.querySelector('p:nth-child(4) span').innerText;
    const strength = playerDiv.querySelector('p[data-stat="strength"] span').innerText;
    const perception = playerDiv.querySelector('p[data-stat="perception"] span').innerText;
    const endurance = playerDiv.querySelector('p[data-stat="endurance"] span').innerText;
    const charisma = playerDiv.querySelector('p[data-stat="charisma"] span').innerText;
    const intelligence = playerDiv.querySelector('p[data-stat="intelligence"] span').innerText;
    const agility = playerDiv.querySelector('p[data-stat="agility"] span').innerText;
    const luck = playerDiv.querySelector('p[data-stat="luck"] span').innerText;

    playerDiv.innerHTML = `
        <h3>${playerId}</h3>
        <label>HP: <input type="number" id="hp-${playerId}" value="${hp}" /></label>
        <label>AP: <input type="number" id="ap-${playerId}" value="${ap}" /></label>
        <label>Currency: <input type="number" id="currency-${playerId}" value="${currency}" /></label>
        <label>STR: <input type="number" id="strength-${playerId}" value="${strength}" /></label>
        <label>PER: <input type="number" id="perception-${playerId}" value="${perception}" /></label>
        <label>END: <input type="number" id="endurance-${playerId}" value="${endurance}" /></label>
        <label>CHA: <input type="number" id="charisma-${playerId}" value="${charisma}" /></label>
        <label>INT: <input type="number" id="intelligence-${playerId}" value="${intelligence}" /></label>
        <label>AGI: <input type="number" id="agility-${playerId}" value="${agility}" /></label>
        <label>LCK: <input type="number" id="luck-${playerId}" value="${luck}" /></label>
        <button onclick="savePlayer('${playerId}')">Save</button>
        <button onclick="cancelEdit('${playerId}')">Cancel</button>
    `;
}

// Uložení změn hráče
async function savePlayer(playerId) {
    const hp = document.getElementById(`hp-${playerId}`).value;
    const ap = document.getElementById(`ap-${playerId}`).value;
    const currency = document.getElementById(`currency-${playerId}`).value;
    const strength = document.getElementById(`strength-${playerId}`).value;
    const perception = document.getElementById(`perception-${playerId}`).value;
    const endurance = document.getElementById(`endurance-${playerId}`).value;
    const charisma = document.getElementById(`charisma-${playerId}`).value;
    const intelligence = document.getElementById(`intelligence-${playerId}`).value;
    const agility = document.getElementById(`agility-${playerId}`).value;
    const luck = document.getElementById(`luck-${playerId}`).value;

    try {
        const response = await fetch(`/api/overseer?id=${playerId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hp: Number(hp),
                ap: Number(ap),
                currency: Number(currency),
                strength: Number(strength),
                perception: Number(perception),
                endurance: Number(endurance),
                charisma: Number(charisma),
                intelligence: Number(intelligence),
                agility: Number(agility),
                luck: Number(luck),
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update player');
        }

        const updatedPlayer = await response.json();
        alert(`Player ${updatedPlayer.name} updated successfully!`);
        loadPlayers(); // Znovu načte seznam hráčů
    } catch (error) {
        console.error('Error updating player:', error);
    }
}

// Zrušení úprav
function cancelEdit(playerId) {
    loadPlayers();
}

// Načtení hráčů při načtení stránky
window.onload = loadPlayers;

document.addEventListener('DOMContentLoaded', function () {
    const tabLinks = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabLinks.forEach(function (tabLink) {
        const targetId = tabLink.getAttribute('href').replace('#', '');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            tabLink.addEventListener('click', function (event) {
                event.preventDefault();
                const tabTrigger = new bootstrap.Tab(tabLink);
                tabTrigger.show();
            });
        } else {
            console.error(`Target element with ID "${targetId}" not found.`);
        }
    });
});

function showTab(tabId) {
  // Skryjeme všechny obsahové sekce
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.style.display = 'none';
  });

  // Zobrazíme požadovanou sekci
  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.style.display = 'block';
  }

  // Nastavíme aktivní třídu v rámci interní navigace "overseer-tabs"
  const tabNav = document.getElementById('overseer-tabs');
  if (tabNav) {
    const navLinks = tabNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    const activeLink = tabNav.querySelector(`.nav-link[onclick="showTab('${tabId}')"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  // Podnabídku ("sub-nav") zobrazíme pouze, pokud je aktivní záložka "status"
  const subNav = document.getElementById('sub-nav');
  if (subNav) {
    subNav.style.display = (tabId === 'status') ? 'block' : 'none';
  }
}
