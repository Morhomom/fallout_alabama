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
    const video = document.getElementById('intro');

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
        document.getElementById('intro-video').style.display = 'none';
        document.querySelector('.character-selection').style.display = 'block';
    };
};


