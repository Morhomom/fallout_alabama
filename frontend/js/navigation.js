function generateNavigation() {
  // Získáme aktuální roli postavy z localStorage (např. "Overseer" nebo jiná)
  const role = localStorage.getItem('selectedRole');
  if (!role) {
    console.error('No role found in localStorage');
    window.location.href = 'index.html'; // pokud není role nastavena, přesměrujeme na login
    return;
  }

  // Pokud je role Overseer, specifikujeme explicitní mapování stránek
  const pages = role === 'Overseer'
    ? { STAT: 'overseer.html', INV: 'overseer.html', DATA: 'overseer.html', MAP: 'overseer.html', RADIO: 'radio.html' }
    : { STAT: 'stat.html', INV: 'inv.html', DATA: 'data.html', MAP: 'map.html', RADIO: 'radio.html' };

  // Definujeme navigační položky
  const navItems = [
    { name: 'STAT', page: pages.STAT },
    { name: 'INV', page: pages.INV },
    { name: 'DATA', page: pages.DATA },
    { name: 'MAP', page: pages.MAP },
    { name: 'RADIO', page: pages.RADIO },
  ];

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
    a.href = item.page;
    a.textContent = item.name;

    // Nastavení aktivní třídy pro aktuální stránku
    if (window.location.pathname.includes(item.page)) {
      a.classList.add('active');
    }

    li.appendChild(a);
    navContainer.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', generateNavigation);