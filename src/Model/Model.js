'use strict';

import GameEvent from '../GameEvent.js';
import GameModel from './GameModel.js';
import MenuModel from './MenuModel.js';

export default class Model {
  constructor() {
    this.winCount = 0;
    this.lossCount = 0;

    this.menu = new MenuModel();
    this.game = new GameModel();

    // Events to notify the View that the Model has changed
    this.instructionsOpenedEvent = new GameEvent(this);
    this.instructionsClosedEvent = new GameEvent(this);
    this.gameResetEvent = new GameEvent(this);
    this.guessMadeEvent = new GameEvent(this);
    this.gameWonEvent = new GameEvent(this);
    this.gameLostEvent = new GameEvent(this);
  }

  // Functions to update the Model
  openInstructions(args) {
    this.menu.openInstructions();
    this.instructionsOpenedEvent.publish();
  };

  closeInstructions(args) {
    this.menu.closeInstructions();
    this.instructionsClosedEvent.publish();
  };

  startNewGame(args) {
    this.game.reset();
    this.gameResetEvent.publish();
  };

  makeGuess(args) {
    this.game.makeGuess(args);

    if (this.rightGuessCount >= this.game.word.length) {
      this.winCount++;
      this.gameWonEvent.publish();
    } else if (this.game.wrongGuessCount >= this.game.MAX_WRONG_GUESS_COUNT) {
      this.lossCount++;
      this.gameLostEvent.publish();
    } else {
      this.guessMadeEvent.publish();
    }
  };
}
