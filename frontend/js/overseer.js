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

    playerDiv.innerHTML = `
        <h3>${playerId}</h3>
        <label>HP: <input type="number" id="hp-${playerId}" value="${hp}" /></label>
        <label>AP: <input type="number" id="ap-${playerId}" value="${ap}" /></label>
        <label>Currency: <input type="number" id="currency-${playerId}" value="${currency}" /></label>
        <button onclick="savePlayer('${playerId}')">Save</button>
        <button onclick="cancelEdit('${playerId}', ${hp}, ${ap}, ${currency})">Cancel</button>
    `;
}

// Uložení změn hráče
async function savePlayer(playerId) {
    const hp = document.getElementById(`hp-${playerId}`).value;
    const ap = document.getElementById(`ap-${playerId}`).value;
    const currency = document.getElementById(`currency-${playerId}`).value;

    try {
        const response = await fetch(`/api/overseer?id=${playerId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hp: Number(hp), ap: Number(ap), currency: Number(currency) }),
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
function cancelEdit(playerId, hp, ap, currency) {
    const playerDiv = document.querySelector(`.player-item button[onclick="savePlayer('${playerId}')"]`).parentElement;
    playerDiv.innerHTML = `
        <h3>${playerId}</h3>
        <p>HP: <span>${hp}</span></p>
        <p>AP: <span>${ap}</span></p>
        <p>Currency: <span>${currency}</span></p>
        <button onclick="editPlayer('${playerId}')">Edit</button>
    `;
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
