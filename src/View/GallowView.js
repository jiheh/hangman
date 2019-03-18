'use strict';

export default class GallowView extends PIXI.Container {
  constructor(game) {
    super();
    this.game = game;

    this.updateHangman();
  }

  updateHangman() {
    for (let i = this.children.length; i <= this.game.wrongGuessCount; i++) {
      let sprite = PIXI.Sprite.fromImage(`/images/${i}.png`);
      sprite.name = i;
      sprite.position.set(200, 200)
      this.addChild(sprite);
    }
  }
}
