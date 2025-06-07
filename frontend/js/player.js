const role = localStorage.getItem('selectedRole');

async function loadPlayer() {
  if (!role) {
    console.error('No role found in localStorage');
    window.location.href = 'index.html';
    return;
  }

  try {
    const response = await fetch(`/api/characters?id=${role}`);
    if (!response.ok) throw new Error('Failed to load character data');
    const player = await response.json();

    document.getElementById('roleName').textContent = player.name;
    document.getElementById('stat-strength').textContent = player.strength;
    document.getElementById('stat-perception').textContent = player.perception;
    document.getElementById('stat-endurance').textContent = player.endurance;
    document.getElementById('stat-charisma').textContent = player.charisma;
    document.getElementById('stat-intelligence').textContent = player.intelligence;
    document.getElementById('stat-agility').textContent = player.agility;
    document.getElementById('stat-luck').textContent = player.luck;

    const hpEl = document.getElementById('hp-value');
    const apEl = document.getElementById('ap-value');
    if (hpEl) hpEl.textContent = `HP ${player.hp}/${player.hp}`;
    if (apEl) apEl.textContent = `AP ${player.ap}/${player.ap}`;
  } catch (err) {
    console.error('Error loading player', err);
  }
}

function useAbility() {
  if (role === 'Medic') {
    alert('Léčíte jiného hráče...');
    // Implementace léčení
  }
}

window.addEventListener('DOMContentLoaded', loadPlayer);
