'use strict';

import GameEvent from '../GameEvent.js';

export default class KeyboardView extends PIXI.Container {
  constructor(game) {
    super();
    this.keyboard = game.keyboard;

    // Events to notify the Controller of User Action in the KeyboardView
    this.makeGuessEvent = new GameEvent(this);

    this.setPosition();
    this.init();
  }

  init() {
    for (let i = 0; i < this.keyboard.validInputValues.length; i++) {
      let buttonText = new PIXI.Text(this.keyboard.validInputValues[i]);
      buttonText.anchor.set(0.5);
      buttonText.position.set(40);

      let button = this.createButton(this.keyboard.validInputValues[i]);
      button.position.set((i % 7) * button.width, Math.floor(i / 7) * 80);
      button.addChild(buttonText);
      this.addChild(button);
    }
  }

  reset() {
    this.children = [];
    this.init();
  }

  updateUsedKeys() {
    Array.from(this.keyboard.guessedValues).forEach(value => {
      let key = this.getChildByName(value);

      key.interactive = false;
      key.beginFill(0xEB984E);
      key.drawRect(0, 0, 80, 80);
      key.endFill();
    });
  }

  setPosition() {
    this.pivot.set(this.width / 2, this.height / 2);
    this.position.set(50, window.innerHeight / 2);
  }

  // HELPER FUNCTIONS
  createButton(letter) {
    let button = new PIXI.Graphics();
    button.name = letter;

    button.interactive = true;
    button.on('pointerdown', () => this.makeGuessEvent.publish(letter));
    button.beginFill(0xFF2342);
    button.drawRect(0, 0, 80, 80);
    button.endFill();

    return button;
  }
}
