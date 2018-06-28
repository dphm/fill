const Point = require('../src/point');

describe('Point', () => {
  test('can create point with x, y coordinates', () => {
    let x = 5;
    let y = 2;
    let point = new Point(x, y);

    expect(point.x).toEqual(x);
    expect(point.y).toEqual(y);
  });

  test('can get neighbors of point', () => {
    let point = new Point(5, 2);
    let top = new Point(5, 1);
    let bottom = new Point(5, 3);
    let left = new Point(4, 2);
    let right = new Point(6, 2);

    expect(point.neighbors).toContainEqual(top);
    expect(point.neighbors).toContainEqual(bottom);
    expect(point.neighbors).toContainEqual(left);
    expect(point.neighbors).toContainEqual(right);
  });
});
