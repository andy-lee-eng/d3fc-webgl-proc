# d3fc-webgl-proc

A Web Assembly package for turning a large set of points into a set of triangles ready for rendering with WebGL.

Implemented to support the [d3fc-webgl](https://github.com/DevAndyLee/d3fc-webgl) project.

## Build

Requires [emscripten](https://emscripten.org/docs/getting_started/downloads.html) support to build.

```
  npm run create-folder
  npm run compile
  npm run build
```

## API

Start by calling `fcWebglProc.loadApi()` to initialise the library (returns a promise that must complete before the API can be used).

```javascript
  fcWebglProc.loadApi().then(() => {
    // Use the API
    fcWebglProc.circles(); // ...
  });
```

## Circles

Converts a set of points into circles. The source data should include `X`, `Y`, `Size` and `SegmentCount` for each circle (where `Size` controls the size of the circle for that point and `SegmentCount` specifies how many triangles will be used to construct the circle).

```javascript
  const data = [
    10, 0, 5, 20, // at (10, 0), size 5 with 20 segments
    -5, 5, 3, 15, // at (05, 5), size 3 with 15 segments
  ];
  const totalSegments = 35; // Total number of segments expected (20 + 15)

  circles()
    .pixelX(2)  // Horizontal scale factor for pixel size (defaults to 1)
    .pixelY(1)  // Vertical scale factor for pixel size (defaults to 1)
    .callback(triangles => {
      // triangles is a flat array of X/Y coordinates (6 values per triangle)
    })
    (data, totalSegments);
```

## Shapes

Converts a set of points into shapes. The source data should include `X`, `Y`, and `Size` for each shape (where `Size` controls the size of the shape for that point). The `shape` property should be set to the array of points to draw for this shape - expected to be positions around the center X/Y position of this shape.

```javascript
  const data = [
    10, 0, 5, // at (10, 0), size 5
    -5, 5, 3, // at (05, 5), size 3
  ];

  shapes()
    .pixelX(2)  // Horizontal scale factor for pixel size (defaults to 1)
    .pixelY(1)  // Vertical scale factor for pixel size (defaults to 1)
    .shape(typePoints)
    .callback(triangles => {
      // triangles is a flat array of X/Y coordinates (6 values per triangle)
    })
    (data);
```
