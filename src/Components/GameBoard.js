const Ship = require("./Ship");

class Gameboard {
  constructor() {
    this.board = [];
    this.ships = [];
    this.missedAttack = [];
  }

  initializedBoard() {
    for (let i = 0; i <= 9; i++) {
      let row = [];
      for (let j = 0; j <= 9; j++) {
        row.push([]);
      }
      this.board.push(row);
    }
  }

  placeShip(length, x, y) {
    let validPlacement = {
      5: [-2, 2],
      4: [-1, 2],
      3: [-1, 1],
      2: [0, 1],
      1: [0, 0],
    };
    // pseudocode
    let validMove = "";
    // create a for loop which valid moves are we using by comparin
    // the length being passed as arguments, then store it as temporary variable
    for (const placement in validPlacement) {
      if (placement == length) {
        // make a valid placement for each ships of the player
        validMove = validPlacement[placement];
      }
    }

    // make a program that will place a ship that will not over board the ship
    if (
      validMove[0] + x >= 0 &&
      validMove[0] + x <= 9 &&
      validMove[1] + y >= 0 &&
      validMove[1] + y <= 9
    ) {
      if (
        this.board[x][y + validMove[0]].length !== 0 ||
        this.board[x][y + validMove[1]].length !== 0 ||
        (length > 1 && this.board[x][y + validMove[0] + 1].length !== 0) ||
        (length > 1 && this.board[x][y + validMove[1] - 1].length !== 0)
      ) {
        return "occupied";
      }
      let ship = new Ship(length);
      this.board[x][y] = ship;

      // this two for loops make sure that after the ship is placed they will occupy the remaining grid
      // make sure that after placing a ship it will occupy the parts of the grid too
      for (let i = y - 1; i >= y + validMove[0]; i--) {
        this.board[x][i] = ship;
      }

      for (let j = y + 1; j <= y + validMove[1]; j++) {
        this.board[x][j] = ship;
      }
      return this.board[x][y];
    }

    // if this doesnt match any condition above it means that the ship is over the board
    return "Cannot place ship here";
  }

  recieveAttack(row, col) {
    // prevent user to hit the ship if it is sunk already
    if (this.board[row][col].length !== 0 && this.board[row][col].isSunk()) {
      return "This ship is sunk";
      // keep hitting if it is not sunk
    } else if (
      this.board[row][col].length !== 0 &&
      !this.board[row][col].isSunk()
    ) {
      this.board[row][col].hit();
      return "hit";
    }

    // if no condition matched return missed
    this.missedAttack.push([row, col]);
    return "missed";
  }

  initializedShip() {
    // get all the ship with no duplicate
    for (const board of this.board) {
      // traverse to the 2d array
      for (const ship of board) {
        // if the ships is nto sunk
        if (!this.ships.includes(ship) && ship.length !== 0) {
          this.ships.push(ship);
        }
      }
    }
  }

  getSpecificBoard(x, y) {
    return this.board[x][y];
  }

  getMissedAttack() {
    return this.missedAttack;
  }

  getAllShip() {
    return this.ships;
  }

  getBoard() {
    return this.board;
  }
}

// const gameboard = new Gameboard();

// gameboard.initializedBoard();

// console.log(gameboard.initializedShip());
// console.log(gameboard.recieveAttack(6, 2));
// console.log(gameboard.recieveAttack(6, 2));
// console.log(gameboard.recieveAttack(6, 2));
// console.log(gameboard.recieveAttack(6, 5));
// console.log(gameboard.getMissedAttack());

// console.log(gameboard.getAllShip());
module.exports = Gameboard;
