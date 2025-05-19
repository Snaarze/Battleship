import { playerBoard } from "../../App";
import { computerBoard } from "../../App";

let clickHandler;
let isStart;
const currentTurn = document.querySelector(".turn-indicator");
const shuffleBtn = document.querySelector(".shuffle-btn");
const startBtn = document.querySelector(".start-btn");
export const newGameBtn = document.querySelector(".new-game-btn");

export const playerAvailableShips = document.querySelector(
  ".player-list-of-sunk-ships",
);

export const computerAvailableShips = document.querySelector(
  ".computer-list-of-sunk-ships",
);
// this function render the board dynamically
export default function renderPlayerBoard(player, board) {
  for (let i = 0; i < player.board.getBoard().length; i++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    for (let j = 0; j < player.board.getBoard()[i].length; j++) {
      const col = document.createElement("div");
      col.style.width = "40px";
      col.style.height = "40px";
      col.style.border = "1px solid black";
      col.classList.add("flex", "justify-center", "items-center", "rounded-md");
      col.setAttribute("row", i);
      col.setAttribute("col", j);
      row.append(col);
      let color = {
        5: "red",
        4: "green",
        3: "yellow",
        2: "blue",
        1: "pink",
      };
      for (let x = 0; x < player.board.getBoard()[i][j].length; x++) {
        if (player.board.getBoard()[i][j].length !== 0) {
          if (
            player.board.getBoard()[i][j].length in color
            // player.name !== "computer"
          ) {
            col.style.backgroundColor =
              color[player.board.getBoard()[i][j].length];
          }
        }
      }
    }

    board.append(row);
  }
}

// this function remove the first child of the board
export function renderBoard(player) {
  while (player.firstChild) {
    player.removeChild(player.firstChild);
  }
}

function switchBoard(board, playerBoard) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      playerBoard.children[i].children[j].textContent = "";
      playerBoard.children[i].children[j].style.backgroundColor = "";
    }
  }
}

// this function return an active player and switch player
export function switchPlayers(player1, player2) {
  let activePlayer = player1.name;

  const switchTurn = () => {
    return (activePlayer =
      activePlayer === player1.name ? player2.name : player1.name);
  };

  const getActivePlayer = () => activePlayer;

  if (getActivePlayer() === player1.name) {
  }
  return {
    getActivePlayer,
    switchTurn,
  };
}

// this function checks if the players ships has been sunk
// function isAllShipSunk(player1, player2) {
//   if (
//     listOfSunkShip.childElementCount === player1.board.getAllShip().length ||
//     listOfSunkShip.childElementCount === player2.board.getAllShip().length
//   ) {
//     return true;
//   }
// }

// this function add event listeners to interact with the dom adn player borad
export function listener(game, player1, player2) {
  clickHandler = (e) => {
    attack(e, game, player1, player2);
  };
  playerBoard.addEventListener("click", clickHandler);
}

function attack(e, game, player1, player2) {
  currentTurn.textContent = game.getActivePlayer();
  if (
    !e.target.hasAttribute("row") ||
    game.getActivePlayer() !== player1.name
  ) {
    return;
  }

  let row = parseInt(e.target.getAttribute("row"));
  let col = parseInt(e.target.getAttribute("col"));
  // this stops the game if the any of the player has sunk the available ships

  if (e.target.textContent === "O" || e.target.textContent === "X") return;
  e.target.textContent = player2.board.recieveAttack(row, col);
  if (
    player2.board.getSpecificBoard(row, col).length !== 0 &&
    player2.board.getSpecificBoard(row, col).isSunk()
  ) {
    if (isAllShipSunk(player1, player2))
      return alert(game.getActivePlayer() + " has won the game!");
  }

  game.switchTurn();
  currentTurn.textContent = game.getActivePlayer();

  let attack = generateRandomAttackComputer();

  // this while loop makes sure that the computer cannot place twice wit same coordinate
  while (
    computerBoard.children[attack.x].children[attack.y].textContent === "X" ||
    computerBoard.children[attack.x].children[attack.y].textContent === "O"
  ) {
    // regenerate another attack
    attack = generateRandomAttackComputer();
  }

  // attack the board

  setTimeout(() => {
    computerBoard.children[attack.x].children[attack.y].textContent =
      player1.board.recieveAttack(attack.x, attack.y);

    game.switchTurn();
    currentTurn.textContent = game.getActivePlayer();
  }, 1000);
}

function removeListener(playerBoard) {
  if (clickHandler) {
    playerBoard.removeEventListener("click", clickHandler);
  }
}

function generateRandomAttackComputer() {
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);

  if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {
    return {
      x,
      y,
    };
  }
}

export function shuffle(player, computer) {
  shuffleBtn.addEventListener("click", () => {
    if (isStart) {
      computer.board.resetBoard();
      computer.board.placeShipRandomly();
      isStart = false;
    }

    player.board.resetBoard();
    player.board.placeShipRandomly();
    console.log(player.board.getBoard());
    renderBoard(playerBoard);
    renderPlayerBoard(player, playerBoard);
    renderBoard(computerBoard);
    renderPlayerBoard(computer, computerBoard);
    removeListener(playerBoard);
  });
}

export function startGame(game, jeremy, computer) {
  startBtn.addEventListener("click", () => {
    listener(game, jeremy, computer);
    switchBoard(jeremy.board.getBoard(), playerBoard);
    switchBoard(computer.board.getBoard(), computerBoard);
    currentTurn.textContent = game.getActivePlayer();
    isStart = true;
  });
}

export function displayAvailableShips(player, holder) {
  for (let i = 0; i < player.board.getAllShip().length; i++) {
    const li = document.createElement("li");
    if (!player.board.getAllShip()[i].isSunk()) {
      li.textContent =
        player.board.getAllShip()[i].name +
        " " +
        player.board.getAllShip()[i].length;
      holder.appendChild(li);
    }
  }
}

export function clearAvailableShips(holder) {
  while (holder.firstChild) {
    holder.removeChild(holder.firstChild);
  }
}
