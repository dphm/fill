class Image {
  constructor(grid) {
    this.grid = grid;
  }

  get height() {
    return this.grid.length;
  }

  get width() {
    if (this.height) {
      return this.grid[0].length;
    } else {
      return 0;
    }
  }

  contains(point) {
    if (point.y < 0 || point.y >= this.height) {
      return false;
    }

    if (point.x < 0 || point.x >= this.width) {
      return false;
    }

    return true;
  }

  valueAt(point) {
    if (this.contains(point)) {
      return this.grid[point.y][point.x];
    } else {
      return null;
    }
  }

  setValueAt(point, value) {
    if (this.contains(point)) {
      this.grid[point.y][point.x] = value;
    }
  }
}

module.exports = Image;
