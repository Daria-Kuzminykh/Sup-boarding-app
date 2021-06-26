const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';
const GLOBAL_CSS_REGEXP = /\.global\.css$/;

function setupDevtool() {
  if (IS_DEV) return 'eval';
  if (IS_PROD) return false;
}

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(tsx|jsx|ts)$/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            }
          },
        ],
        exclude: GLOBAL_CSS_REGEXP
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2)$/,
        use: ['file-loader']
      },
      {
        test: /\.(png|webp|jpg|jpeg)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/static/image'), to: path.resolve(__dirname, 'dist/static/image') },
      ]
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: IS_DEV,
  },
  devtool: setupDevtool()
}