'use strict';

export default class GallowView extends PIXI.Container {
  constructor(game) {
    super();
    this.game = game;

    this.init();
    this.updateHangman();
  }

  init() {
    let positions = [
      [650, 600],
      [1000, 600],
      [650, -25],
      [650, 0],
      [650, 0],
      [1100, 0],
      [1050, 150]
    ];

    for (let i = 0; i < this.game.MAX_WRONG_GUESS_COUNT; i++) {
      let sprite = PIXI.Sprite.fromImage(`/images/${i}.png`);
      sprite.visible = false;
      sprite.position.set(positions[i][0], positions[i][1]);
      this.addChild(sprite);
    }
  }

  reset() {
    this.children.forEach(child => child.visible = false);
  }

  updateHangman() {
    for (let i = 0; i < this.game.wrongGuessCount; i++) {
      this.children[i].visible = true;
    }
  }
}
