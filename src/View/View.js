'use strict';

import * as PIXI from 'pixi.js';
import GameView from './GameView.js';
import MenuView from './MenuView.js';
import ScoreView from './ScoreView.js';

export default class View {
  constructor(model) {
    this.model = model;

    this.pixiApp = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0xFDEBD0});
    this.game = new GameView(model.game);
    this.menu = new MenuView(model.menu);
    this.score = new ScoreView(model);

    this.clickAudio = new Audio('/audio/click.mp3');
    this.winAudio = new Audio('/audio/win.mp3');
    this.loseAudio = new Audio('/audio/lose.mp3');

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

  // Functions to update the View when Model changes
  openInstructions() {
    this.menu.openInstructions()
  }

  closeInstructions() {
    this.menu.closeInstructions()
  }

  resetGame() {
    this.game.reset();
    this.score.visible = true;
    this.game.visible = true;
    this.menu.visible = false;
  }

  updateGuess() {
    this.clickAudio.play();
    this.game.updateGuess();
  }

  updateGameWon() {
    this.winAudio.play();
    this.score.updateScore();
    this.game.reset();
  }

  updateGameLost() {
    this.loseAudio.play();
    this.score.updateScore();
    this.game.reset();
  }

  init() {
    document.body.appendChild(this.pixiApp.view);

    this.pixiApp.stage.addChild(this.menu);
    this.pixiApp.stage.addChild(this.score);
    this.pixiApp.stage.addChild(this.game);

    this.score.visible = false;
    this.game.visible = false;
  }
}
