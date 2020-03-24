const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = (env) => ({
  entry: {
    login: path.resolve(__dirname, './client/login.jsx'),
    second: path.resolve(__dirname, './client/second.jsx'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
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
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['login'],
      template: path.resolve(__dirname, './client/login.html'),
      filename: 'login.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['second'],
      template: path.resolve(__dirname, './client/secondpage.html'),
      filename: 'secondpage.html',
    }),
  ],
});
