'use strict';

export default class Gallow extends PIXI.Container {
  constructor() {
    super();
    this.gallowParts = [1, 2, 3, 4, 5, 6, 7];

    // this.width = window.innerWidth / 2;
    // this.x = window.innerWidth - this.width;

    this.render();
  }

  render() {
    for (let i = 0; i < this.gallowParts.length; i++) {
      let texture = PIXI.Sprite.fromImage(`/images/${i}.png`);
      this.addChild(texture);
    }
  }
}
