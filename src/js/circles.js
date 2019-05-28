import {api} from './api';

export default () => {
  let pixelX = 1;
  let pixelY = 1;
  let callback = () => {};

  const circles = (points, totalSegments) => {
    const {inst, generate_circles} = api;
    const segmentLen = totalSegments * 6;
    let in_buffer;
    let out_buffer;
    try {
      in_buffer = inst._malloc(points.length * Float32Array.BYTES_PER_ELEMENT);
      out_buffer = inst._malloc(segmentLen * Float32Array.BYTES_PER_ELEMENT);

      // Assign the data to the heap - Keep in mind bytes per element
      inst.HEAPF32.set(points, in_buffer / Float32Array.BYTES_PER_ELEMENT);

      generate_circles(in_buffer, points.length / 4, pixelX, pixelY, out_buffer);

      callback(new Float32Array(inst.HEAPF32.buffer, out_buffer, segmentLen));
    } finally {
      inst._free(in_buffer);
      inst._free(out_buffer);
    }
  };

  circles.pixelX = (...args) => {
    if (!args.length) {
        return pixelX;
    }
    pixelX = args[0];
    return circles;
  };

  circles.pixelY = (...args) => {
    if (!args.length) {
        return pixelY;
    }
    pixelY = args[0];
    return circles;
  };

  circles.callback = (...args) => {
    if (!args.length) {
        return callback;
    }
    callback = args[0];
    return circles;
  };

  return circles;
};
