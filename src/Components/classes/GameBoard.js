const Ship = require("./Ship");

class Gameboard {
  constructor() {
    this.board = [];
    this.ships = [];
    this.missedAttack = [];
    this.allAttacks = [];
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

  resetBoard() {
    this.board = [];
  }

  placeShip(length, x, y, position) {
    let validPlacement = {
      5: [-2, 2],
      4: [-1, 2],
      3: [-1, 1],
      2: [0, 1],
      1: [0, 0],
    };

    // pseudocode
    let validMove = "";
    // create a for loop which valid moves ar  we using by comparin
    // the length being passed as arguments, then store it as temporary variable
    if (length in validPlacement) {
      validMove = validPlacement[length];
    }

    if (position === "horizontal") {
      // make a program that will place a ship that will not over board the ship
      if (
        validMove[0] + x >= 0 &&
        validMove[0] + x <= 9 &&
        validMove[1] + y >= 0 &&
        validMove[1] + y <= 9
      ) {
        for (let i = y + validMove[0]; i <= y + validMove[1]; i++) {
          if (this.board[x][i]?.length !== 0) {
            return "occupied";
          }
        }

        let ship = new Ship(length);

        this.board[x][y] = ship;
        this.ships.push(ship);
        // this two for loops make sure that after the ship is placed they will occupy the remaining grid
        // make sure that after placing a ship it will occupy the parts of the grid too
        for (let i = y + validMove[0]; i <= y + validMove[1]; i++) {
          this.board[x][i] = ship;
        }

        return this.board[x][y];
      }
    } else if (position === "vertical") {
      if (
        validMove[0] + x >= 0 &&
        validMove[1] + x <= 9 &&
        validMove[1] + y >= 0 &&
        validMove[1] + y <= 9
      ) {
        for (let i = x + validMove[0]; i <= x + validMove[1]; i++) {
          if (this.board[i][y]?.length !== 0) {
            return "occupied";
          }
        }

        let ship = new Ship(length);

        this.board[x][y] = ship;
        this.ships.push(ship);
        // this two for loops make sure that after the ship is placed they will occupy the remaining grid
        // make sure that after placing a ship it will occupy the parts of the grid too
        for (let i = x + validMove[0]; i <= x + validMove[1]; i++) {
          this.board[i][y] = ship;
        }

        return this.board[x][y];
      }
    }

    // if this doesnt match any condition above it means that the ship is over the board
    return "Cannot place ship here";
  }

  recieveAttack(row, col) {
    // prevent user to hit the ship if it is sunk already

    this.allAttacks.push([row, col]);
    if (this.board[row][col].length !== 0) {
      this.board[row][col].hit();

      // keep hitting if it is not sunk
      console.log(this.board[row][col]);
      return "X";
    }

    // if no condition matched return missed
    this.missedAttack.push([row, col]);
    return "O";
  }

  placeShipRandomly() {
    this.ships = [];

    this.initializedBoard();
    for (let i = 1; i <= 5; i++) {
      let placed = false;

      while (!placed) {
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);
        let randomNum = Math.floor(Math.random() * 2) + 1;

        let position = randomNum <= 1 ? "horizontal" : "vertical";
        let ship = this.placeShip(i, row, col, position);
        if (ship === "occupied" || ship === "Cannot place ship here") {
          console.log(ship);
          placed = false;
          continue;
        }
        placed = true;
      }
    }
  }

  getSpecificBoard(x, y) {
    return this.board[x][y];
  }

  getAllAttacks() {
    return this.allAttacks;
  }

  isAllShipSunk() {
    let availableShip = [];
    for (const board of this.ships) {
      if (board.isSunk()) {
        continue;
      }
      availableShip.push(board);
    }
    return availableShip;
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

module.exports = Gameboard;
