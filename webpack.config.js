const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        include: path.resolve(__dirname, './src')
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({})
  ]
};