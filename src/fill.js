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

class Image {
  constructor(grid) {
    this.grid = grid;
  }

  contains(point) {
    if (point.x < 0 || point.y < 0) {
      return false;
    }

    let numRows = this.grid.length;
    if (point.y >= numRows) {
      return false;
    }

    let numCols = this.grid[point.y].length;
    if (point.x >= numCols) {
      return false;
    }

    return true;
  }
}

function fill(image, start, color) {
  if (!image.contains(start)) {
    return;
  }

  let startColor = image.grid[start.y][start.x];
  let queue = [];
  queue.push(start);

  while (queue.length > 0) {
    let point = queue.shift();
    if (!image.contains(point)) {
      continue;
    }

    let pointColor = image.grid[point.y][point.x];
    if (pointColor.matches(color)) {
      continue;
    }

    if (pointColor.matches(startColor)) {
      image.grid[point.y][point.x] = color;
      Array.prototype.push.apply(queue, point.neighbors);
    }
  }
}

function drawToCanvas(image) {
  let canvas = document.getElementById('image');
  let ctx = canvas.getContext('2d');

  canvas.height = image.grid.length;
  canvas.width = image.grid[0].length;

  image.grid.forEach((row, row_i) => {
    row.forEach((color, col_i) => {
      ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      ctx.fillRect(col_i, row_i, 1, 1);
    });
  });
}

let b = new Color(0, 0, 0);
let w = new Color(255, 255, 255);
let m = new Color(255, 0, 255);

let image = new Image([
  [w, w, w, w, w],
  [w, b, w, b, w],
  [w, w, w, w, w],
  [w, b, b, b, w],
  [w, w, w, w, w],
]);

let start = new Point(0, 0);

fill(image, start, m);
drawToCanvas(image);
