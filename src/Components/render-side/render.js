import { playerBoard } from "../../App";
import { computerBoard } from "../../App";
const currentTurn = document.querySelector(".turn-indicator");
export const listOfSunkShip = document.querySelector(".list-of-sunk-ships");
export default function renderPlayerBoard(player, board) {
  for (let i = 0; i < player.length; i++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    for (let j = 0; j < player[i].length; j++) {
      const col = document.createElement("div");
      col.style.width = "25px";
      col.style.height = "25px";
      col.style.border = "1px solid black";
      col.setAttribute("row", i);
      col.setAttribute("col", j);
      row.append(col);
    }
    board.append(row);
  }
}

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

function isAllShipSunk(player1, player2) {
  if (
    listOfSunkShip.childElementCount === player1.board.getAllShip().length ||
    listOfSunkShip.childElementCount === player2.board.getAllShip().length
  ) {
    return true;
  }
}
export function listener(game, player1, player2) {
  playerBoard.addEventListener("click", (e) => {
    currentTurn.textContent = game.getActivePlayer();
    if (
      !e.target.hasAttribute("row") ||
      game.getActivePlayer() !== player1.name
    ) {
      return;
    }

    if (isAllShipSunk(player1, player2))
      return alert(game.getActivePlayer() + " has won the game!");

    let row = parseInt(e.target.getAttribute("row"));
    let col = parseInt(e.target.getAttribute("col"));
    // this stops the game if the any of the player has sunk the available ships

    if (e.target.textContent === "O" || e.target.textContent === "X") return;
    e.target.textContent = player2.board.recieveAttack(row, col);
    if (
      player2.board.getSpecificBoard(row, col).length !== 0 &&
      player2.board.getSpecificBoard(row, col).isSunk()
    ) {
      const sunkShips = document.createElement("li");
      sunkShips.textContent =
        player2.board.getSpecificBoard(row, col).name + " has been sunk";

      listOfSunkShip.appendChild(sunkShips);
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
  });
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
