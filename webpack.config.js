const path = require('path');

module.exports = (env) => ({
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  mode: env.NODE_ENV,
  devServer: {
    port: 8080,
    publicPath: '/dist/',
    proxy: {
      '/': {
        target: 'http://localhost:3000',
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
});
