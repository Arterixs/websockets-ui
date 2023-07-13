import { Storage } from './storage.js';

class WinnersController {
  private storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  setWinners(name: string) {
    const isCheckWinner = this.storage.winners.find((winner) => winner.name === name);
    if (isCheckWinner) {
      isCheckWinner.wins += 1;
    } else {
      this.storage.winners.push({ name, wins: 1 });
    }
  }

  getWinnersString() {
    return JSON.stringify(this.storage.winners);
  }
}

export const winnersBase = new WinnersController();
