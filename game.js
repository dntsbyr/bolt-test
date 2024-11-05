export class CookieGame {
  constructor() {
    this.cookies = 0;
    this.cookiesPerClick = 1;
    this.cookiesPerSecond = 0;
    this.upgrades = {
      cursor: { count: 0, base_cost: 15, cps: 0.1 },
      grandma: { count: 0, base_cost: 100, cps: 1 },
      farm: { count: 0, base_cost: 500, cps: 5 }
    };
  }

  click() {
    this.cookies += this.cookiesPerClick;
  }

  getUpgradeCost(type) {
    const upgrade = this.upgrades[type];
    return Math.floor(upgrade.base_cost * Math.pow(1.15, upgrade.count));
  }

  canBuyUpgrade(type) {
    return this.cookies >= this.getUpgradeCost(type);
  }

  buyUpgrade(type) {
    if (!this.canBuyUpgrade(type)) return false;
    
    const cost = this.getUpgradeCost(type);
    this.cookies -= cost;
    this.upgrades[type].count++;
    this.updateCookiesPerSecond();
    return true;
  }

  updateCookiesPerSecond() {
    this.cookiesPerSecond = Object.values(this.upgrades)
      .reduce((sum, upgrade) => sum + upgrade.count * upgrade.cps, 0);
  }

  tick() {
    this.cookies += this.cookiesPerSecond / 10;
  }
}