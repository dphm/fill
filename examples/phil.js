const
  Color = require('../src/color'),
  Image = require('../src/image'),
  Point = require('../src/point'),
  fill = require('../src/fill');

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

let start = new Point(2, 2);

fill(image, start, m);
drawToCanvas(image);
