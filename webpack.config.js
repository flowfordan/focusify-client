const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//creation of small css files
//opposite of creation large css-bundle
//for prod
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//css minification
//for prod primarily
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

//resolve paths as in tsconfig
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const path = require('path');
const webpack = require('webpack');
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      //css-sass handling
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          // "style-loader",
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      //SVGR let import svg as such:
      //import Icon from "./someIcon.svg"
      {
        test: /\.svg$/,
        use: {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          },
        },
      },
      // images
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {       
      directory: path.resolve(__dirname, './dist')
    },
    client: {
      progress: true,
    },
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: 'body'
        // favicon: './public/favicon.ico',
    }),
    // new CopyWebpackPlugin({patterns: [
    //   // { from: 'public/*.json', to: '[name].json' },
    //   // { from: 'public/*.png', to: '[name].png' },
    //   // { from: 'public', }
    // ]}),
    new MiniCssExtractPlugin(),
    new CssMinimizerPlugin(),
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
      quiet: true,
    }),
    new Dotenv({
      path: prod ? `./.env.production` : `./.env.development`,
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ],
}