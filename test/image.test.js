const
  Image = require('../src/image'),
  Point = require('../src/point');

describe('Image', () => {
  test('can create image with height and width from 2d array', () => {
    let image = new Image([]);

    expect(image.height).toEqual(0);
    expect(image.width).toEqual(0);

    image = new Image([[0]]);

    expect(image.height).toEqual(1);
    expect(image.width).toEqual(1);

    image = new Image([[0, 0]]);

    expect(image.height).toEqual(1);
    expect(image.width).toEqual(2);

    image = new Image([
      [0],
      [0],
    ]);

    expect(image.height).toEqual(2);
    expect(image.width).toEqual(1);
  });

  test('can check if contains point', () => {
    let image = new Image([[0, 0]]);

    expect(image.contains(new Point(0, 0))).toEqual(true);
    expect(image.contains(new Point(1, 0))).toEqual(true);
    expect(image.contains(new Point(-1, 0))).toEqual(false);
    expect(image.contains(new Point(0, -1))).toEqual(false);
    expect(image.contains(new Point(2, 0))).toEqual(false);
    expect(image.contains(new Point(0, 1))).toEqual(false);
    expect(image.contains(new Point(2, 1))).toEqual(false);
  });

  test('can get value at point', () => {
    let value = 100;
    let image = new Image([[value]]);

    expect(image.valueAt(new Point(0, 0))).toEqual(value);
  });

  test('value returns null if image does not contain point', () => {
    let image = new Image([[100]]);

    expect(image.valueAt(new Point(0, 1))).toBeNull();
  });

  test('can set value at point', () => {
    let point = new Point(0, 0);
    let image = new Image([[100]]);
    let value = 255;

    image.setValueAt(point, value);

    expect(image.valueAt(point)).toEqual(value);
  });

  test('does not raise error on set if image does not contain point', () => {
    let image = new Image([[100]]);

    expect(image.setValueAt(new Point(0, 1), 255)).toBeUndefined();
  });
});
