const role = localStorage.getItem('selectedRole');

function useAbility() {
  if (role === 'Medic') {
    alert('Léčíte jiného hráče...');
    // Implementace léčení
  }
}
