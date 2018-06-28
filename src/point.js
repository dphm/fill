class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get neighbors() {
    let x = this.x;
    let y = this.y;
    return [
      new Point(x, y - 1),
      new Point(x + 1, y),
      new Point(x, y + 1),
      new Point(x - 1, y),
    ];
  }
}

module.exports = Point;
