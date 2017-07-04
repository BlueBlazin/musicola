const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'static', 'client.js'),
  output: {
    path: path.join(__dirname, 'static'),
    filename: '/bundle.js'
  },
  module: {
    loaders: [{
      test: path.join(__dirname),
      loader: ['babel-loader'],
      query: {
        cacheDirectory: 'babel_cache',
        presets: ['react', 'es2015']
      }
    }]
  }
};

























 //
