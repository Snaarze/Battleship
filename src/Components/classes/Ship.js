class Ship {
  constructor(size) {
    this.name = this.availableNames(size);
    this.length = size;
    this.hitCount = 0;
  }

  availableNames(size) {
    let names = {
      5: "Carrier",
      4: "Battleship",
      3: "Cruiser",
      2: " Submarine",
      1: "Destroyer",
    };

    if (size in names) {
      return names[size];
    }
  }

  getHitCount() {
    return this.hitCount;
  }

  isSunk() {
    return this.hitCount === this.length ? true : false;
  }

  hit() {
    ++this.hitCount;
  }
}

module.exports = Ship;
