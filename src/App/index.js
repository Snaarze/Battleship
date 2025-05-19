import "./style.css";
import Player from "../Components/classes/Player";
import renderPlayerBoard from "../Components/render-side/render";
import { renderBoard } from "../Components/render-side/render";
import {
  shuffle,
  switchPlayers,
  startGame,
} from "../Components/render-side/render";

import {
  displayAvailableShips,
  clearAvailableShips,
  playerAvailableShips,
  computerAvailableShips,
  newGameBtn,
} from "../Components/render-side/render";
export const playerBoard = document.querySelector(".player-board");
export const computerBoard = document.querySelector(".computer-board");

export const initialPlayers = () => {
  console.log("test");
  const jeremy = new Player("jeremy");

  jeremy.board.placeShipRandomly();

  renderBoard(playerBoard);
  renderPlayerBoard(jeremy, playerBoard);

  const computer = new Player("computer");

  computer.board.placeShipRandomly();
  renderBoard(computerBoard);
  renderPlayerBoard(computer, computerBoard);
  clearAvailableShips(playerAvailableShips);
  displayAvailableShips(jeremy, playerAvailableShips);
  clearAvailableShips(computerAvailableShips);
  displayAvailableShips(computer, computerAvailableShips);

  let game = switchPlayers(jeremy, computer);
  startGame(game, jeremy, computer);
  shuffle(jeremy, computer);
};

initialPlayers();
