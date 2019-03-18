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
    let startButton = this.createGraphic('startBtn','Start Game',() => this.startNewGameEvent.publish(),300, 100);
    let instructionsButton = this.createGraphic('instBtn', 'Instructions', () => this.openInstructionsEvent.publish(), 300, 100);

    this.render(startButton, 0, 100);
    this.render(instructionsButton, 0, -100);
  }

  openInstructions() {
    if (this.menu.isInstructionsOpen && !this.getChildByName('instructions')) {
      let instructions = this.createGraphic('instructions', this.menu.instructions, () => this.closeInstructionsEvent.publish(), 750, 500);
      this.render(instructions, 0, 0);
    }
  }

  closeInstructions() {
    let instructions = this.getChildByName('instructions');
    if (instructions) this.removeChild(instructions);
  }

  // HELPER FUNCTIONS
  createGraphic(name, text, event, width, height) {
    let graphic = new PIXI.Graphics();
    graphic.name = name;

    graphic.beginFill(0xFFFFFF);
    graphic.drawRect(0, 0, width, height);
    graphic.endFill();

    let graphicText = new PIXI.Text(text);
    graphicText.anchor.set(0.5);
    graphicText.position.set(width / 2, height / 2);
    graphic.addChild(graphicText);

    graphic.interactive = true;
    graphic.on('pointerdown', event);

    return graphic;
  }

  render(graphic, offsetX, offsetY) {
    let centerWidth = window.innerWidth / 2;
    let centerHeight = window.innerHeight / 2;

    graphic.pivot.set(graphic.width / 2, graphic.height / 2);
    graphic.position.set(centerWidth + offsetX, centerHeight + offsetY);
    this.addChild(graphic);
  }
}
