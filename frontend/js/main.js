function selectRole(role) {
  localStorage.setItem('selectedRole', role);
  if (role === 'Overseer') {
    window.location.href = 'overseer.html';
  } else {
    window.location.href = 'player.html';
  }
}

// Po načtení stránky
window.onload = function () {
  // Při otevření domovské stránky vymažeme zvolenou roli
  localStorage.removeItem('selectedRole');

  const params = new URLSearchParams(window.location.search);
  const skipIntro = params.get('skipIntro');

  const videoContainer = document.getElementById('intro-video');
  const video = document.getElementById('intro');
  const selection = document.querySelector('.character-selection');

  if (skipIntro) {
    if (videoContainer) videoContainer.style.display = 'none';
    if (selection) selection.style.display = 'block';
    return; // přeskočíme přehrávání
  }

  // Zkontroluje, zda prohlížeč povolí přehrávání se zvukem
  const playVideoWithSound = () => {
    video.muted = false; // Zruší ztlumení
    video.play(); // Spustí video
  };

  // Pokud prohlížeč blokuje zvuk, čeká na interakci uživatele
  if (video.muted || video.paused) {
    document.body.addEventListener('click', playVideoWithSound, { once: true });
  }

  // Přechod na výběr postav po skončení videa
  video.onended = function () {
    if (videoContainer) videoContainer.style.display = 'none';
    if (selection) selection.style.display = 'block';
  };
};


