'use strict';

export default class KeyboardModel {
  constructor() {
    // Constants
    this.INPUT_ASCII_RANGE_START = 65; // Ascii code for 'A'
    this.INPUT_ASCII_RANGE_END = 90; // Ascii code for 'Z'

    this.validInputValues = this.getInputValues(this.INPUT_ASCII_RANGE_START, this.INPUT_ASCII_RANGE_END);
    this.guessedValues = new Set();
  }

  reset() {
    this.guessedValues = new Set();
  }

  makeGuess(letter) {
    this.guessedValues.add(letter);
  }

  // HELPER FUNCTIONS
  getInputValues(rangeStart, rangeEnd) {
    let stringValues = [];
    for (let code = rangeStart; code <= rangeEnd; code++) stringValues.push(String.fromCharCode(code));
    return stringValues;
  }
}
