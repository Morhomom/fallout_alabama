function generateNavigation() {
  // Získáme aktuální roli postavy z localStorage (např. "Overseer" nebo jiná)
  const role = localStorage.getItem('selectedRole');
  if (!role) {
    console.error('No role found in localStorage');
    window.location.href = 'index.html'; // pokud není role nastavena, přesměrujeme na login
    return;
  }

  // Definujeme seznam navigačních položek a jejich šablonové názvy souborů
  const navItems = [
    { name: 'STAT', page: 'stat' },
    { name: 'INV', page: 'inv' },
    { name: 'DATA', page: 'data' },
    { name: 'MAP', page: 'map' },
    { name: 'RADIO', page: 'radio' },
  ];

  // Pokud je role Overseer, předponu upravíme (např. "-overseer")
  const suffix = role === 'Overseer' ? '-overseer' : '';

  const navContainer = document.getElementById('dynamic-nav');
  if (!navContainer) {
    console.error('Navigation container #dynamic-nav not found.');
    return;
  }
  navContainer.innerHTML = ''; // Vyčistíme obsah

  navItems.forEach(item => {
    const li = document.createElement('li');
    li.className = 'nav-item';

    const a = document.createElement('a');
    a.className = 'nav-link';
    a.href = `${item.page}${suffix}.html`;
    a.textContent = item.name;

    // Nastavení aktivní třídy pro aktuální stránku
    if (window.location.pathname.includes(`${item.page}${suffix}.html`)) {
      a.classList.add('active');
    }

    li.appendChild(a);
    navContainer.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', generateNavigation);