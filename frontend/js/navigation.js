function generateNavigation() {
  // Získáme aktuální roli postavy z localStorage (např. "Overseer" nebo jiná)
  const role = localStorage.getItem('selectedRole');
  if (!role) {
    console.error('No role found in localStorage');
    window.location.href = 'index.html'; // pokud není role nastavena, přesměrujeme na login
    return;
  }

  // Pokud je role Overseer, definujeme mapování odkazů a vnitřních záložek;
  // jinak používáme standardní stránky pro hráče.
  const pages = role === 'Overseer'
    ? { 
        STAT: { page: 'overseer.html', tab: 'status' },
        INV: { page: 'overseer.html', tab: 'inventory' },
        DATA: { page: 'overseer.html', tab: 'data-section' },
        MAP: { page: 'overseer.html', tab: 'map' },
        RADIO: { page: 'radio.html' }
      }
    : { 
        STAT: { page: 'stat.html' },
        INV: { page: 'inv.html' },
        DATA: { page: 'data.html' },
        MAP: { page: 'map.html' },
        RADIO: { page: 'radio.html' }
      };

  // Definujeme navigační položky
  const navItems = [
    { name: 'STAT', config: pages.STAT },
    { name: 'INV', config: pages.INV },
    { name: 'DATA', config: pages.DATA },
    { name: 'MAP', config: pages.MAP },
    { name: 'RADIO', config: pages.RADIO },
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
    a.href = item.config.page;
    a.textContent = item.name;

    // Přidáme listener – u Overseera přepneme obsah bez reloadu
    a.addEventListener('click', function(e) {
      if (role === 'Overseer' && item.config.page === 'overseer.html') {
        e.preventDefault();
        if (item.config.tab) {
          // Zavoláme funkci pro přepínání záložek, tu je třeba mít definovanou v overseer.js
          showTab(item.config.tab);
        }
      }
      // U ostatních odkazů necháme standardní chování (náhodou dojde k přesměrování)
    });

    // Nastavení aktivní třídy pro aktuální stránku – kontrola na koncovou část URL
    if(window.location.pathname.endsWith(item.config.page)) {
      a.classList.add('active');
    }

    li.appendChild(a);
    navContainer.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', generateNavigation);