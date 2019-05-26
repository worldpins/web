const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = () => {
  const { NODE_ENV } = process.env;
  const isProduction = NODE_ENV === 'production';

  // Build plugins
  const plugins = [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({ template: './index.html' }),
  ];

  if (!isProduction) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (isProduction) {
    plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
    plugins.push(new CompressionPlugin({ deleteOriginalAssets: false }));
  }

  // Return configuration
  return {
    mode: isProduction ? 'production' : 'development',
    entry: { main: './src/index.tsx' },
    context: path.resolve(__dirname, './'),
    stats: 'normal',
    devtool: isProduction ? '' : 'eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      host: 'localhost',
      port: 8080,
      historyApiFallback: true,
      hot: true,
      inline: true,
      publicPath: '/',
      clientLogLevel: 'none',
      open: true,
      overlay: true,
    },
    output: {
      // contentHash enables us to cache until we alter our code, big benefit to our users.
      chunkFilename: '[name].[contenthash].js',
      // HMR needs a hash and won't work with contenthash
      filename: isProduction ? '[name].[contenthash].js' : '[name].[hash].js',
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
    },
    optimization: {
      concatenateModules: process.env.NODE_ENV === 'production',
      splitChunks: {
        automaticNameDelimiter: '-',
        cacheGroups: {
          common: {
            chunks: 'all',
            name: 'common',
            test: /[\\/]src[\\/](common|global|layout)[\\/]/
          },
        },
      },
    },
    plugins,
    resolve: {
      alias: {
        react: path.resolve(__dirname, 'node_modules/react'),
        "react-dom": path.resolve(__dirname, 'node_modules/react-dom/')
      },
      mainFields: ['module', 'main', 'browser'],
      extensions: [".tsx", ".ts", ".mjs", ".js", ".jsx"]
    },
    stats: "normal",
    module: {
      rules: [
        {
          // This is to support our `graphql` dependency, they expose a .mjs bundle instead of .js
          // Sneaky sneaky sir graphql.
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          // Pre-compile graphql strings.
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {},
            },
          ],
        },
        {
          // Allows us to debug our typescript just like js.
          test: /\.js$/,
          enforce: 'pre',
          exclude: /node_modules/,
          loader: 'source-map-loader',
        },
        {
          // Makes our babel-loader the lord and savior over our TypeScript
          test: /\.ts$|\.tsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
  };
};
