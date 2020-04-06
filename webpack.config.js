const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              includePaths: ['./node_modules'],
            },
          },
        ],
      },
    ],
  },
  // module: {
  //   rules: [
  //     { exclude: /node_modules/ },
  //     { loader: 'style-loader!css-loader', test: /\.css$/ },
  //     { use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } } },
  //   ],
  // },
};