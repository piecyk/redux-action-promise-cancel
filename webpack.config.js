const path = require('path');
const srcPath = path.resolve(__dirname, './src');

module.exports = {
  resolve: {
    modules: [srcPath, './node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        include: srcPath,
      },
    ],
  },
};
