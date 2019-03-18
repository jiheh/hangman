'use strict';

import Model from './Model/Model.js';
import View from './View/View.js';
import Controller from './Controller/Controller.js';

class Application {
  constructor() {
    this.model = new Model();
    this.view = new View(this.model);
    this.controller = new Controller(this.model, this.view);
  }
}

let app = new Application();
