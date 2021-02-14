const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './source/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'www/js'),
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          extractComments: false,
          terserOptions: {
            sourceMap: true,
            format: { comments: false, }
          }
        })
      ]
    }
};