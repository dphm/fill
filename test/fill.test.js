const
  Color = require('../src/color'),
  Image = require('../src/image'),
  Point = require('../src/point'),
  fill = require('../src/fill');

describe('fill', () => {
  let r = new Color(255, 0, 0);
  let b = new Color(0, 0, 255);

  test('can change color of start point in image', () => {    
    let image = new Image([[r]]);
    let point = new Point(0, 0);

    fill(image, point, b);

    expect(image.valueAt(point).matches(b)).toEqual(true);
  });

  test('can change color of group matching start point in image', () => {
    let image = new Image([[r, r]]);
    let point = new Point(0, 0);

    fill(image, point, b);

    expect(image.valueAt(point).matches(b)).toEqual(true);
    expect(image.valueAt(new Point(1, 0)).matches(b)).toEqual(true);

    image = new Image([
      [r],
      [r],
    ]);

    fill(image, point, b);

    expect(image.valueAt(point).matches(b)).toEqual(true);
    expect(image.valueAt(new Point(0, 1)).matches(b)).toEqual(true);
  });

  test('does not change color of diagonals matching start point in image', () => {
    let image = new Image([
      [r, b],
      [b, r],
    ]);

    let point = new Point(0, 0);

    fill(image, point, b);

    expect(image.valueAt(point).matches(b)).toEqual(true);
    expect(image.valueAt(new Point(0, 1)).matches(b)).toEqual(true);
    expect(image.valueAt(new Point(1, 0)).matches(b)).toEqual(true);
    expect(image.valueAt(new Point(1, 1)).matches(b)).toEqual(false);
  });
});
