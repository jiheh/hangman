'use strict';

export default class ScoreView extends PIXI.Container {
  constructor(model) {
    super();
    this.model = model;

    this.updateScore();
  }

  updateScore() {
    this.children = [];

    let numWins = new PIXI.Text(`Wins: ${this.model.winCount}`);
    numWins.position.set(10, 10);
    this.addChild(numWins);

    let numLosses = new PIXI.Text(`Losses: ${this.model.lossCount}`);
    numLosses.position.set(window.innerWidth - numLosses.width - 10, 10);
    this.addChild(numLosses);
  }
}
