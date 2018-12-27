const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// TODO: add custom terser

// TODO: CDN React and React-DOM
const frameworkVendors = [
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
  'styled-components',
  'styled-normalize',
];

const stateVendors = [
  'apollo-cache-inmemory',
  'apollo-client',
  'apollo-link',
  'apollo-link-error',
  'apollo-link-http',
  'apollo-link-state',
  'react-apollo',
  'graphql',
  'graphql-tag',
];

module.exports = () => {
  const { NODE_ENV } = process.env;
  const isProduction = NODE_ENV === 'production';

  // Build plugins
  const plugins = [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
  ];

  if (!isProduction) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new BundleAnalyzerPlugin());
  }

  // Return configuration
  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      main: './src/index.tsx',
      frameworkVendors,
      stateVendors,
    },
    context: path.resolve(__dirname, './'),
    stats: 'minimal',
    devtool: isProduction ? '' : 'eval-source-map',
    devServer: {
      host: '127.0.0.1',
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
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, './dist'),
    },
    optimization: {
      concatenateModules: process.env.NODE_ENV === 'production',
      splitChunks: {
        automaticNameDelimiter: '-',
        cacheGroups: {
          common: {
            chunks: 'all',
            name: 'common',
            test: /[\\/]src[\\/](common|layout)[\\/]/
          },
          frameworkVendors: {
            chunks: 'all',
            name: 'frameworkVendors',
            test: 'frameworkVendors'
          },
          stateVendors: {
            chunks: 'all',
            name: 'stateVendors',
            test: 'stateVendors'
          },
        },
        chunks: 'all',
      },
      runtimeChunk: 'single',
    },

    plugins,
    resolve: {
      mainFields: ['module', 'main', 'browser'],
      extensions: [".tsx", ".ts", ".mjs", ".js", ".jsx"]
    },
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
