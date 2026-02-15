/* ── Game Registry & Navigation ──────────────────── */
const App = (() => {
  const games = {};

  const menuScreen = document.getElementById('menu-screen');
  const gameScreen = document.getElementById('game-screen');
  const gameContainer = document.getElementById('game-container');
  const gameCards = document.getElementById('game-cards');
  const backBtn = document.getElementById('back-btn');

  let activeGame = null;

  function registerGame(game) {
    games[game.id] = game;
    renderCards();
  }

  function renderCards() {
    gameCards.innerHTML = '';
    Object.values(games).forEach(game => {
      const card = document.createElement('div');
      card.className = 'game-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.innerHTML = `
        <div class="card-icon">${game.icon}</div>
        <div class="card-title">${game.title}</div>
        <div class="card-desc">${game.description}</div>
      `;
      card.addEventListener('pointerup', () => showGame(game.id));
      gameCards.appendChild(card);
    });
  }

  function showMenu() {
    if (activeGame && games[activeGame] && games[activeGame].destroy) {
      games[activeGame].destroy();
    }
    activeGame = null;
    gameContainer.innerHTML = '';
    gameScreen.classList.add('hidden');
    menuScreen.classList.remove('hidden');
  }

  function showGame(id) {
    const game = games[id];
    if (!game) return;

    menuScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    gameContainer.innerHTML = '';
    activeGame = id;

    if (game.init) {
      game.init(gameContainer);
    }
  }

  backBtn.addEventListener('pointerup', showMenu);

  return { registerGame, showMenu, showGame };
})();
