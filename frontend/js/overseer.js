function updateStat(player, stat, value) {
  const playerData = JSON.parse(localStorage.getItem(player)) || {};
  playerData[stat] = value;
  localStorage.setItem(player, JSON.stringify(playerData));
}

function applyEffect(player) {
  alert(`Používáte efekt na ${player}`);
  // Implementace efektu
}
