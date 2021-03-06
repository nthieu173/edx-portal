// This is the common Webpack config. The dev and prod Webpack configs both
// inherit config defined here.
const path = require('path');

module.exports = {
  entry: {
    segment: path.resolve(__dirname, '../src/segment.js'),
    app: path.resolve(__dirname, '../src/index.jsx'),
    demoDataLoader: path.resolve(__dirname, '../src/demo/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
