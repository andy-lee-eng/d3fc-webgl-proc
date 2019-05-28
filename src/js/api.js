import Module from '../../wasm/d3fc-webgl-proc';

const imports = {
  print: (function() {
    return (...args) => {
      console.log(...args);
    };
  })()
};

export const api = {};
const promise = new Promise(resolve => {
  Module(imports).then(inst => {
    Object.assign(api, getApi(inst));
    resolve(api);
  });
});
export default () => promise;

const getApi = inst => ({
  inst,
  generate_circles: inst.cwrap('generate_circles', 'number', ['number', 'number', 'number', 'number', 'number']),
  generate_shapes: inst.cwrap('generate_shapes', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'])
});
