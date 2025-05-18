import "./style.css";
import Player from "../Components/classes/Player";
import renderPlayerBoard from "../Components/render-side/render";
import { switchPlayers } from "../Components/render-side/render";
import { listener } from "../Components/render-side/render";
export const playerBoard = document.querySelector(".player-board");
export const computerBoard = document.querySelector(".computer-board");

const initialPlayers = () => {
  const jeremy = new Player("jeremy");
  jeremy.board.initializedBoard();
  jeremy.board.placeShipRandomly();
  console.log(jeremy.board.getBoard());

  jeremy.board.initializedShip();
  console.log(jeremy.board.getAllShip());
  renderPlayerBoard(jeremy.board.getBoard(), playerBoard);

  const computer = new Player("computer");
  computer.board.initializedBoard();
  computer.board.placeShipRandomly();
  computer.board.initializedShip();
  console.log(computer.board.getAllShip());
  console.log(computer.board.getBoard());
  renderPlayerBoard(computer.board.getBoard(), computerBoard);
  let game = switchPlayers(jeremy, computer);
  listener(game, jeremy, computer);
};

initialPlayers();
