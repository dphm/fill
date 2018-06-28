class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  matches(other) {
    return this.r === other.r
      && this.g === other.g
      && this.b === other.b;
  }
}

module.exports = Color;
