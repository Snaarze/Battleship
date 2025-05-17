const Gameboard = require("../Components/GameBoard.js");
const gameboard = new Gameboard();
describe("Gameboard", () => {
  gameboard.initializedBoard();

  test("gameboard should be able to place a ships at specific coordinates ", () => {
    expect(gameboard.placeShip(5, 2, 2)).toEqual({
      length: 5,
      hitCount: 0,
    });
  });

  test("gameboard should be able to place a ships at specific coordinates ", () => {
    expect(gameboard.placeShip(5, 0, 0)).toEqual("Cannot place ship here");
    // if there are placed ship or occupied the grid should have their coordinates to assume it is occupied
  });

  test("gameboard should be able to place a ships at specific coordinates ", () => {
    expect(gameboard.placeShip(4, 2, 5)).toEqual("occupied");
  });

  test("gameboard should be able to place a ships at specific coordinates ", () => {
    expect(gameboard.placeShip(3, 6, 2)).toEqual({
      length: 3,
      hitCount: 0,
    });
  });

  test("gameboard should be able to place a ships at specific coordinates ", () => {
    expect(gameboard.placeShip(2, 7, 7)).toEqual({
      length: 2,
      hitCount: 0,
    });
  });

  test("gameboard should be able to place a ships at specific coordinates ", () => {
    expect(gameboard.placeShip(1, 9, 9)).toEqual({
      length: 1,
      hitCount: 0,
    });
  });
  test("gameboard should be able to place a ships at specific coordinates ", () => {
    expect(gameboard.placeShip(1, 9, 9)).toEqual("occupied");
  });

  test("should display hit with coordinates of 6 and 2", () => {
    expect(gameboard.recieveAttack(6, 2)).toBe("hit");
  });

  test("should display missed with coordinates of 6 and 4", () => {
    expect(gameboard.recieveAttack(6, 4)).toBe("missed");
  });
  test("should display missed with coordinates of 6 and 4", () => {
    expect(gameboard.recieveAttack(1, 1)).toBe("missed");
  });

  test("should display missed with coordinates of 6 and 4", () => {
    expect(gameboard.recieveAttack(9, 1)).toBe("missed");
  });
  test("should display missed with coordinates of 6 and 4", () => {
    expect(gameboard.recieveAttack(9, 3)).toBe("missed");
  });
  test("should display missed with coordinates of 8 and 8", () => {
    expect(gameboard.recieveAttack(9, 9)).toBe("hit");
  });

  test("should display missed with coordinates of 8 and 8", () => {
    expect(gameboard.recieveAttack(9, 9)).toBe("This ship is sunk");
  });

  test("display the missed attack array", () => {
    expect(gameboard.getMissedAttack()).toEqual([
      [6, 4],
      [1, 1],
      [9, 1],
      [9, 3],
    ]);
  });
});
