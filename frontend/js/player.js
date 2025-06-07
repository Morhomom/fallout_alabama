const role = localStorage.getItem('selectedRole');
document.getElementById('roleName').innerText = role;

function useAbility() {
  if (role === 'Medic') {
    alert('Léčíte jiného hráče...');
    // Implementace léčení
  }
}
