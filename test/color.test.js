const Color = require('../src/color');

describe('Color', () => {
  test('can create color with r, g, b values', () => {
    let r = 50;
    let g = 100;
    let b = 150;
    let color = new Color(r, g, b);

    expect(color.r).toEqual(r);
    expect(color.g).toEqual(g);
    expect(color.b).toEqual(b);
  });

  test('can check if color matches other color', () => {
    let color = new Color(50, 100, 150);
    let same = new Color(50, 100, 150);
    let diff = new Color(49, 100, 150);

    expect(color.matches(same)).toEqual(true);
    expect(color.matches(diff)).toEqual(false);
  });
});
