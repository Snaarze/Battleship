const Gameboard = require("./GameBoard");

export default class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
  }
}
