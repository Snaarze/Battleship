class Ship {
  constructor(size) {
    this.length = size;
    this.hitCount = 0;
  }

  getHitCount() {
    return this.hitCount;
  }

  isSunk() {
    return this.hitCount === this.length ? true : false;
  }

  hit() {
    this.hitCount++;
  }
}

module.exports = Ship;
