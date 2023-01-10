const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const IS_DEV = process.env.NODE_ENV === 'development'
const publicPath = IS_DEV ? '/' : '/'
module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[fullhash].js',
    clean: true,
    publicPath,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  devServer: {
    static: { directory: path.join(__dirname, 'public'), publicPath: '/' },
    historyApiFallback: true,
    port: 8080,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.(webp|jpg|jpeg|png|gif|mp3|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 5 * 1024, // 5KB, default is 8 KB
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ],
  devtool: IS_DEV ? 'inline-source-map' : false,
}
