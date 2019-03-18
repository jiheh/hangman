'use strict';

export default class MenuModel {
  constructor() {
    this.isInstructionsOpen = false;
    this.instructions =
      'Guess the letters of the hidden word!\nBut be careful!\n7 wrong guesses, and you\'ll find yourself hanging!';
  }

  openInstructions() {
    this.isInstructionsOpen = true;
  };

  closeInstructions() {
    this.isInstructionsOpen = false;
  };
}
