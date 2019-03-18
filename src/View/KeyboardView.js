'use strict';

import GameEvent from '../GameEvent.js';

export default class KeyboardView extends PIXI.Container {
  constructor(keyboard) {
    super();

    this.keyboard = keyboard;

    // Events to notify the Controller of User Action in the KeyboardView
    this.makeGuessEvent = new GameEvent(this);

    this.init();
  }

  init() {
    this.children = [];

    for (let i = 0; i < this.keyboard.validInputValues.length; i++) {
      let buttonText = new PIXI.Text(this.keyboard.validInputValues[i]);
      buttonText.anchor.set(0.5);
      buttonText.position.set(50);

      let button = this.getButton(this.keyboard.validInputValues[i]);
      button.position.set((i % 7) * button.width, Math.floor(i / 7) * 100);
      button.addChild(buttonText);
      this.addChild(button);
    }
  }

  getButton(letter) {
    let button = new PIXI.Graphics();
    button.name = letter;

    button.interactive = true;
    button.click = () => this.makeGuessEvent.publish(letter);
    button.beginFill(0xFF2342);
    button.drawRect(0, 0, 100, 100);
    button.endFill();

    return button;
  }

  updateUsedKeys() {
    Array.from(this.keyboard.guessedValues).forEach(value => {
      let key = this.getChildByName(value);

      key.interactive = false;
      key.beginFill(0xD8D8D8);
      key.drawRect(0, 0, 100, 100);
      key.endFill();
    });
  }
}
