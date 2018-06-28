const
  Color = require('./color'),
  Image = require('./image'),
  Point = require('./point');

function fill(image, start, color) {
  if (!image.contains(start)) {
    return;
  }

  let startColor = image.valueAt(start);
  let queue = [];
  queue.push(start);

  while (queue.length > 0) {
    let point = queue.shift();
    if (!image.contains(point)) {
      continue;
    }

    let pointColor = image.valueAt(point);
    if (pointColor.matches(color)) {
      continue;
    }

    if (pointColor.matches(startColor)) {
      image.setValueAt(point, color);
      Array.prototype.push.apply(queue, point.neighbors);
    }
  }
}

function drawToCanvas(image) {
  let canvas = document.getElementById('image');
  if (canvas) {
    let ctx = canvas.getContext('2d');

    canvas.height = image.height;
    canvas.width = image.width;

    image.grid.forEach((row, row_i) => {
      row.forEach((color, col_i) => {
        ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
        ctx.fillRect(col_i, row_i, 1, 1);
      });
    });
  }
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
