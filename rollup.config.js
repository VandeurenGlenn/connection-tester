import babel from 'rollup-plugin-babel';

export default {
  entry: 'lib/index.js',
  dest: 'dist/connection-tester.js',
  format: 'cjs',
  plugins: [ babel() ]
};
