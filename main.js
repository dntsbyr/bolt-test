import './style.css';
import { CookieGame } from './game.js';

const game = new CookieGame();
const formatter = new Intl.NumberFormat('en', { maximumFractionDigits: 1 });

function updateDisplay() {
  document.querySelector('#cookies').textContent = 
    formatter.format(Math.floor(game.cookies));
  document.querySelector('#cps').textContent = 
    formatter.format(game.cookiesPerSecond);

  // Update upgrade buttons
  Object.entries(game.upgrades).forEach(([type, upgrade]) => {
    const button = document.querySelector(`#buy-${type}`);
    const cost = game.getUpgradeCost(type);
    button.textContent = `Buy ${type} (${formatter.format(cost)} cookies)`;
    button.disabled = !game.canBuyUpgrade(type);
    document.querySelector(`#${type}-count`).textContent = upgrade.count;
  });
}

document.querySelector('#app').innerHTML = `
  <div>
    <div class="cookie" id="cookie-button">🍪</div>
    <div class="stats">
      <div><span id="cookies">0</span> cookies</div>
      <div>per second: <span id="cps">0</span></div>
    </div>
    <div class="upgrades">
      <div>Cursors: <span id="cursor-count">0</span></div>
      <button id="buy-cursor">Buy cursor</button>
      
      <div>Grandmas: <span id="grandma-count">0</span></div>
      <button id="buy-grandma">Buy grandma</button>
      
      <div>Farms: <span id="farm-count">0</span></div>
      <button id="buy-farm">Buy farm</button>
    </div>
  </div>
`;

// Event listeners
document.querySelector('#cookie-button').addEventListener('click', () => {
  game.click();
  updateDisplay();
});

// Upgrade buttons
Object.keys(game.upgrades).forEach(type => {
  document.querySelector(`#buy-${type}`).addEventListener('click', () => {
    game.buyUpgrade(type);
    updateDisplay();
  });
});

// Game loop
setInterval(() => {
  game.tick();
  updateDisplay();
}, 100);

// Initial display update
updateDisplay();