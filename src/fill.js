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

module.exports = fill;
