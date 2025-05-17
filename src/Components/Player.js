const Gameboard = require("./GameBoard");

class Player {
  constructor() {
    this.board = new Gameboard();
  }
}

const jeremy = new Player();
console.log(jeremy.board.initializedBoard());
jeremy.board.placeShip(3, 6, 2);
jeremy.board.placeShip(5, 2, 2);
jeremy.board.placeShip(4, 3, 3);
jeremy.board.placeShip(3, 4, 2);
jeremy.board.placeShip(2, 4, 8);
jeremy.board.placeShip(1, 8, 8);
jeremy.board.initializedShip();
console.log(jeremy.board.getAllShip());
