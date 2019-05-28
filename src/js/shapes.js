import {api} from './api';

export default () => {
  let pixelX = 1;
  let pixelY = 1;
  let shape = [];
  let callback = () => {};

  const shapes = (points) => {
    const {inst, generate_shapes} = api;
    const totalSegments = (points.length / 3) * (shape.length / 2 - 1);
    const segmentLen = totalSegments * 6;
    let in_buffer;
    let shape_buffer;
    let out_buffer;
    try {
      in_buffer = inst._malloc(points.length * Float32Array.BYTES_PER_ELEMENT);
      shape_buffer = inst._malloc(shape.length * Float32Array.BYTES_PER_ELEMENT);
      out_buffer = inst._malloc(segmentLen * Float32Array.BYTES_PER_ELEMENT);

      // Assign the data to the heap - Keep in mind bytes per element
      inst.HEAPF32.set(points, in_buffer / Float32Array.BYTES_PER_ELEMENT);
      inst.HEAPF32.set(shape, shape_buffer / Float32Array.BYTES_PER_ELEMENT);

      generate_shapes(in_buffer, points.length / 3, shape_buffer, shape.length / 2, pixelX, pixelY, out_buffer);

      callback(new Float32Array(inst.HEAPF32.buffer, out_buffer, segmentLen));
    } finally {
      inst._free(in_buffer);
      inst._free(shape_buffer);
      inst._free(out_buffer);
    }
  };

  shapes.pixelX = (...args) => {
    if (!args.length) {
        return pixelX;
    }
    pixelX = args[0];
    return shapes;
  };

  shapes.pixelY = (...args) => {
    if (!args.length) {
        return pixelY;
    }
    pixelY = args[0];
    return shapes;
  };

  shapes.shape = (...args) => {
    if (!args.length) {
        return shape;
    }
    shape = args[0];
    return shapes;
  };

  shapes.callback = (...args) => {
    if (!args.length) {
        return callback;
    }
    callback = args[0];
    return shapes;
  };

  return shapes;
};
