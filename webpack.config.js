var path = require('path')
var pathToPhaser = path.join(__dirname, '/node_modules/phaser/')
var phaser = path.join(pathToPhaser, 'dist/phaser.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin');


module.exports = {
  entry: './game.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
      { test: /phaser\.js$/, loader: 'expose-loader?Phaser' },
      { test: /\.(png|svg|jpg|gif)$/, use: [{
        loader:'file-loader'
      }]},
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    publicPath: '/',
    host: '127.0.0.1',
    port: 8080,
    open: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser: phaser
    }
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ZipPlugin()
  ]
}
