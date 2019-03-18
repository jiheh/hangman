'use strict';

export default class GameEvent {
  constructor(sender) {
    this.sender = sender;
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  publish(args) {
    for (let i = 0; i < this.subscribers.length; i++) {
      this.subscribers[i](this.sender, args);
    }
  }
}
