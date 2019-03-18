'use strict';

import * as PIXI from 'pixi.js';
import GameView from './GameView.js';
import MenuView from './MenuView.js';

export default class View {
  constructor(model) {
    this.model = model;

    this.pixiApp = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x1099bb});
    this.menu = new MenuView(model.menu);
    this.game = new GameView(model.game);

    this.setupSubscriptions();
    this.init();
  }

  // Subscriptions to updates in the Model
  setupSubscriptions() {
    this.model.instructionsOpenedEvent.subscribe(this.openInstructions.bind(this));
    this.model.instructionsClosedEvent.subscribe(this.closeInstructions.bind(this));
    this.model.gameResetEvent.subscribe(this.resetGame.bind(this));
    this.model.guessMadeEvent.subscribe(this.updateGuess.bind(this));
    this.model.gameWonEvent.subscribe(this.updateGameWon.bind(this));
    this.model.gameLostEvent.subscribe(this.updateGameLost.bind(this));
  }

  openInstructions() {
    this.menu.openInstructions();
  }

  closeInstructions() {
    this.menu.closeInstructions();
  }

  resetGame() {
    this.displayChildContainer(this.game);
  }

  updateGuess() {
    this.game.gallow.updateHangman();
    this.game.keyboard.updateUsedKeys();
    this.game.word.updateWordGuess();
  }

  updateGameWon() {
  }

  updateGameLost() {
  }

  // HELPER FUNCTIONS
  init() {
    document.body.appendChild(this.pixiApp.view);
    this.displayChildContainer(this.menu);
  }

  displayChildContainer(child) {
    this.pixiApp.stage.children = [];

    child.pivot.set(child.width / 2, child.height / 2);
    child.position.set(window.innerWidth / 2, window.innerHeight / 2);
    this.pixiApp.stage.addChild(child);
  }
}
