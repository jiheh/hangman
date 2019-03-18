'use strict';

import GameEvent from '../GameEvent.js';

export default class MenuView extends PIXI.Container {
  constructor(menu) {
    super();
    this.menu = menu;

    // Events to notify the Controller of User Action in the MenuView
    this.openInstructionsEvent = new GameEvent(this);
    this.closeInstructionsEvent = new GameEvent(this);
    this.startNewGameEvent = new GameEvent(this);

    this.init();
  }

  init() {
    let startButton = this.createButton('Start Game', () => this.startNewGameEvent.publish());
    let instructionsButton = this.createButton('Instructions', () => this.openInstructionsEvent.publish());

    instructionsButton.position.set(0, -100);
    startButton.position.set(0, 100);
    this.addChild(startButton);
    this.addChild(instructionsButton);
  }

  openInstructions() {
    if (this.menu.isInstructionsOpen && !this.getChildByName('instructions')) {
      let instructions = new PIXI.Text(this.menu.instructions);
      instructions.name = 'instructions';

      this.addChild(instructions);

      this.interactive = true;
      this.on('pointerdown', () => this.closeInstructionsEvent.publish());
    }
  }

  closeInstructions() {
    let instructions = this.getChildByName('instructions');
    if (instructions) {
      this.removeChild(instructions);
      this.interactive = false;
    }
  }

  // HELPER FUNCTIONS
  createButton(text, event) {
    let button = new PIXI.Graphics();
    // button.name = text;

    button.beginFill(0xFFFFFF);
    button.drawRect(0, 0, 300, 100);
    button.endFill();

    let buttonText = new PIXI.Text(text);
    buttonText.anchor.set(0.5);
    buttonText.position.set(150, 50);
    button.addChild(buttonText)

    button.interactive = true;
    button.on('pointerdown', event);

    return button;
  }
}
