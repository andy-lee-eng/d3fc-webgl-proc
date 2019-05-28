import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

const packageName = 'd3fc-webgl-proc';

export default {
  input: 'index.js',
  output: {
    file: `build/${packageName}.js`,
    format: 'umd',
    name: 'fcWebglProc',
    sourcemap: true
  },
  plugins: [
      babel({
          babelrc: false,
          presets: [
              ['@babel/preset-env']
          ]
      }),
      resolve({ mainFields: ['module'] })
  ]
}
