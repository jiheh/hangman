'use strict';

export default class WordView extends PIXI.Container {
  constructor(game) {
    super();
    this.game = game;

    this.setPosition();
    this.updateWordGuess();
  }

  updateWordGuess() {
    this.game.guess.forEach((letter, idx) => {
      let letterText = new PIXI.Text(letter || '_');

      letterText.position.set((idx % this.game.guess.length) * 100, 50);
      this.addChild(letterText);
    });
  }

  reset() {
    this.children = [];
    this.updateWordGuess();
  }

  setPosition() {
    this.position.set(50, 100);
  }
}
