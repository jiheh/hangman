'use strict';

import GallowView from './GallowView.js';
import KeyboardView from './KeyboardView.js';
import WordView from './WordView.js';

export default class GameView extends PIXI.Container {
  constructor(game) {
    super();
    this.game = game;

    this.gallow = new GallowView(game);
    this.keyboard = new KeyboardView(game);
    this.word = new WordView(game);

    this.init();
  }

  init() {
    this.addChild(this.gallow);
    this.addChild(this.keyboard);
    this.addChild(this.word);
  }
}
