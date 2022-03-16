const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const lastRemainingStartValue = 50;
let lastRemaining = lastRemainingStartValue;

setInterval(() => {
  lastRemaining--;
  if (lastRemaining < 0) {
    lastRemaining = lastRemainingStartValue;
  }
}, 1000);

module.exports = {
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, 'build'),
  },
  resolve: {
    modules: ['scripts', 'node_modules'],
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebPackPlugin({ template: 'src/index.html' }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/,
        options: {
          presets: [
            ['@babel/preset-env', { modules: false, targets: { browsers: ['last 2 versions'] } }],
            'react',
          ],
          cacheDirectory: true,
          plugins: [
            'transform-strict-mode',
            'transform-object-rest-spread',
            'transform-class-properties',
          ],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    proxy: {
      '/api/get-remaining-time': {
        bypass: function (req, res) {
          if (req.originalUrl !== '/api/get-remaining-time') {
            return;
          }
          return res.send({
            timeRemaining: lastRemaining
          });
        },
      },
    },

  },
};
