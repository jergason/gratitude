var webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^react$/, 'react/addons')
  ],

  entry: './client/app/index.jsx',

  output: {
    path: './client/build/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: '6to5' },
    ]
  },

  devtool: "#source-map"
};
