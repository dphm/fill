# fill

flood fill

## Clarifications

* All images are 2D, represented by a two-dimensional array.
* Images are color: each pixel has R, G, and B components.
* Colors must match exactly in order for the fill to propagate.
* Paint can only flow up, down, left, and right—not diagonally.

## Example

Phil has two eyes and a mouth. Here is an image representing Phil in `black` and `white`:

```
let b = new Color(0, 0, 0);
let w = new Color(255, 255, 255);

let image = new Image([
  [w, w, w, w, w],
  [w, b, w, b, w],
  [w, w, w, w, w],
  [w, b, b, b, w],
  [w, w, w, w, w],
]);
```

To fill in `magenta` for `white`, we can start filling at any `white` point. Let's choose `(2, 2)` as the starting point.

```
let start = new Point(2, 2);
let m = new Color(255, 0, 255);

fill(image, start, m);
```

Here's what Phil looks like after the fill (and zooming):

![Pixelated portrait of Phil](assets/phil.ico)

### Breadth-first search (BFS)

* **Time complexity:** O(`image.width` * `image.height`)
* **Space complexity:** O(1)

Breadth-first search checks neighbors of the starting point, then neighbors of neighbors, then neighbors of (neighbors of neighbors), and so on.

```javascript
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
```

At `(2, 2)`, the color is `white`. Calling `fill` will replace all `white` points connected (directly or indirectly) to point `(2, 2)` with `magenta`.

The `queue` is a list of points to process. First, we add `(2, 2)` to the `queue`.

```
queue: [(2, 2)]
image: [
  [w, w, w, w, w],
  [w, b, w, b, w],
  [w, w, w, w, w],
  [w, b, b, b, w],
  [w, w, w, w, w],
]
```

#### Layer 0: The starting point

##### Point: `(2, 2)`

- [x] The image contains the point `(2, 2)`
- [x] Point `(2, 2)` is `white`

Set `(2, 2)` to `magenta`.
Add neighbors of `(2, 2)` to the `queue`: `(2, 1)`, `(3, 2)`, `(2, 3)`, `(1, 2)`.

```
queue: [(2, 1), (3, 2), (2, 3), (1, 2)]
image: [
  [w, w, w, w, w],
  [w, b, w, b, w],
  [w, w, m, w, w],
  [w, b, b, b, w],
  [w, w, w, w, w],
]
```

#### Layer 1: Neighbors of the starting point

##### Point: `(2, 1)` (top)

- [x] The image contains the point `(2, 1)`
- [x] Point `(2, 1)` is `white`

Set `(2, 1)` to `magenta`.
Add neighbors of `(2, 1)` to the `queue`: `(2, 0)`, `(3, 1)`, `(2, 2)`, `(1, 1)`.

```
queue: [(3, 2), (2, 3), (1, 2), (2, 0), (3, 1), (2, 2), (1, 1)]
image: [
  [w, w, w, w, w],
  [w, b, m, b, w],
  [w, w, m, w, w],
  [w, b, b, b, w],
  [w, w, w, w, w],
]
```

##### Point: `(3, 2)` (right)

- [x] The image contains the point `(3, 2)`
- [x] Point `(3, 2)` is `white`

Set `(3, 2)` to `magenta`.
Add neighbors of `(3, 2)` to the `queue`: `(3, 1)`, `(4, 2)`, `(3, 3)`, `(2, 2)`.

```
queue: [(2, 3), (1, 2), (2, 0), (3, 1), (2, 2), (1, 1), (3, 1), (4, 2), (3, 3), (2, 2)]
image: [
  [w, w, w, w, w],
  [w, b, m, b, w],
  [w, w, m, m, w],
  [w, b, b, b, w],
  [w, w, w, w, w],
]
```

##### Point: `(2, 3)` (bottom)

- [x] The image contains the point `(2, 3)`
- [ ] Point `(2, 3)` is `white`

```
queue: [(1, 2), (2, 0), (3, 1), (2, 2), (1, 1), (3, 1), (4, 2), (3, 3), (2, 2)]
```

##### Point: `(1, 2)` (left)

- [x] The image contains the point `(1, 2)`
- [x] Point `(1, 2)` is `white`

Set `(1, 2)` to `magenta`.
Add neighbors of `(1, 2)` to the `queue`: `(1, 1)`, `(2, 2)`, `(1, 3)`, `(0, 2)`.

```
queue: [(2, 0), (3, 1), (2, 2), (1, 1), (3, 1), (4, 2), (3, 3), (2, 2), (1, 1), (2, 2), (1, 3), (0, 2)]
image: [
  [w, w, w, w, w],
  [w, b, m, b, w],
  [w, m, m, m, w],
  [w, b, b, b, w],
  [w, w, w, w, w],
]
```

#### Layer 2: Neighbors of Layer 1

##### Point: `(2, 0)` (top of top)

- [x] The image contains the point `(2, 0)`
- [x] Point `(2, 0)` is `white`

Set `(2, 0)` to `magenta`.
Add neighbors of `(2, 0)` to the `queue`: `(2, -1)`, `(3, 0)`, `(2, 1)`, `(1, 0)`.

```
queue: [(3, 1), (2, 2), (1, 1), (3, 1), (4, 2), (3, 3), (2, 2), (1, 1), (2, 2), (1, 3), (0, 2), (2, -1), (3, 0), (2, 1), (1, 0)]
image: [
  [w, w, m, w, w],
  [w, b, m, b, w],
  [w, m, m, m, w],
  [w, b, b, b, w],
  [w, w, w, w, w],
]
```

##### Point: `(3, 1)` (right of top)

- [x] The image contains the point `(3, 1)`
- [ ] Point `(3, 1)` is `white`

```
queue: [(2, 2), (1, 1), (3, 1), (4, 2), (3, 3), (2, 2), (1, 1), (2, 2), (1, 3), (0, 2), (2, -1), (3, 0), (2, 1), (1, 0)]
```

##### Point: `(2, 2)` (bottom of top)

- [x] The image contains the point `(2, 2)`
- [ ] Point `(2, 2)` is `white`

```
queue: [(1, 1), (3, 1), (4, 2), (3, 3), (2, 2), (1, 1), (2, 2), (1, 3), (0, 2), (2, -1), (3, 0), (2, 1), (1, 0)]
```

##### Point: `(1, 1)` (left of top)

- [x] The image contains the point `(1, 1)`
- [ ] Point `(1, 1)` is `white`

```
queue: [(3, 1), (4, 2), (3, 3), (2, 2), (1, 1), (2, 2), (1, 3), (0, 2), (2, -1), (3, 0), (2, 1), (1, 0)]
```

... The process continues for (top, right, bottom, left) neighbors of the rest of the Layer 1 points.

#### End

The breadth-first search concludes when all the `white` points in the image are `magenta` (since all the white points are touching each other). As soon as the last `white` becomes `magenta`, all remaining points in the `queue` will

* not be contained in the image, or
* not be `white`

and will therefore not add anything else to the `queue`.
