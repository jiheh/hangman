'use strict';

import * as RandomWords from 'random-words';
import KeyboardModel from './KeyboardModel.js';

export default class GameModel {
  constructor() {
    // Constants
    this.MAX_WRONG_GUESS_COUNT = 7;
    this.MAX_WORD_LENGTH = 10;

    this.keyboard = new KeyboardModel();

    this.word = '';
    this.letterIndices = {}; // {key: letter from word, value: [array of indices for letter]}

    this.guess = [];
    this.rightGuessCount = 0;
    this.wrongGuessCount = 0;

    this.reset();
  }

  reset() {
    this.keyboard.reset();

    this.word = RandomWords({exactly: 1, maxLength: this.MAX_WORD_LENGTH})[0].toUpperCase();
    this.letterIndices = this.wordToIndicesObj(this.word);

    this.guess = new Array(this.word.length).fill(null);
    this.rightGuessCount = 0;
    this.wrongGuessCount = 0;
  }

  makeGuess(letter) {
    let indices = this.letterIndices[letter];

    if (indices) {
      indices.forEach(idx => {
        this.guess[idx] = letter;
        this.rightGuessCount++;
      });
    } else {
      this.wrongGuessCount++;
    }

    this.keyboard.makeGuess(letter);
  }

  // HELPER FUNCTIONS
  wordToIndicesObj(word) {
    let newLetterIndices = {};

    word.split('').forEach((letter, idx) => {
      let oldIndices = newLetterIndices[letter];
      newLetterIndices[letter] = oldIndices ? oldIndices.concat(idx) : [idx];
    });

    return newLetterIndices;
  }
}
