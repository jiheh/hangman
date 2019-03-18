'use strict';

import KeyboardView from './KeyboardView.js';

export default class GameView extends PIXI.Container {
  constructor(game) {
    super();
    this.game = game;
    this.keyboard = new KeyboardView(game.keyboard);

    this.init();
  }

  init() {
    this.addChild(this.keyboard);

    // for (let i = 0; i < this.game.wrongGuessCount; i++) {
    //   let texture = PIXI.Sprite.fromImage(`/images/${i}.png`);
    //   this.addChild(texture);
    // }
  }
}
