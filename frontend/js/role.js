const role = localStorage.getItem('selectedRole');
window.addEventListener('DOMContentLoaded', () => {
  const roleElement = document.getElementById('roleName');
  if (roleElement && role) {
    roleElement.textContent = role;
  }
});
