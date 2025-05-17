const Ship = require("../Components/Ship");

let ship = new Ship(5);
test.skip("hit 5 times", () => {
  for (let i = 0; i < 5; i++) {
    ship.hit();
  }
  expect(ship.isSunk()).toBe(true);
});
