'use strict';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.setupSubscriptions();
  }

  // Subscriptions to events that are fired through the View
  setupSubscriptions() {
    this.view.menu.openInstructionsEvent.subscribe(this.openInstructions.bind(this));
    this.view.menu.closeInstructionsEvent.subscribe(this.closeInstructions.bind(this));
    this.view.menu.startNewGameEvent.subscribe(this.startNewGame.bind(this));

    this.view.game.keyboard.makeGuessEvent.subscribe(this.makeGuess.bind(this));
    // this.view.game.startNewGameEvent.subscribe(this.startNewGame.bind(this));
  }

  // The events trigger the Model to update
  openInstructions(sender, args) {this.model.openInstructions(args)};
  closeInstructions(sender, args) {this.model.closeInstructions(args)};
  startNewGame(sender, args) {this.model.startNewGame(args)};
  makeGuess(sender, args) {this.model.makeGuess(args)};
}
