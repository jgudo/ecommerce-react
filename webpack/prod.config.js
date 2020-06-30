const webpack = require('webpack');
const merge = require('webpack-merge');
const DotEnv = require('dotenv');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
DotEnv.config({ path: '.env.prod'});
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  output: {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      // in case you got a minified error #307, just remove uglify js
      // problems may occur when using react hooks 
      // new UglifyJsPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/404.html'),
      template: '404.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
    new webpack.DefinePlugin({
      'process.env.FIREBASE_API_KEY':JSON.stringify(process.env.FIREBASE_API_KEY),
      'process.env.FIREBASE_AUTH_DOMAIN':JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      'process.env.FIREBASE_DB_URL':JSON.stringify(process.env.FIREBASE_DB_URL),
      'process.env.FIREBASE_PROJECT_ID':JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      'process.env.FIREBASE_STORAGE_BUCKET':JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      'process.env.FIREBASE_MSG_SENDER_ID':JSON.stringify(process.env.FIREBASE_MSG_SENDER_ID),
      'process.env.FIREBASE_APP_ID':JSON.stringify(process.env.FIREBASE_APP_ID)
    }),
    //  // keep module.id stable when vendor modules does not change
    // new webpack.HashedModuleIdsPlugin(),
    // // enable scope hoisting
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // generate service worker
    // new workboxPlugin.InjectManifest({
    //   swSrc: path.resolve(__dirname, '../src/sw-src.js'),
    //   swDest: 'sw.js'
    // })
    new workboxPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, '../src/sw-src.js'),
      swDest: 'sw.js'
    })

    // new workboxPlugin.GenerateSW({
    //   cacheId: 'salinaka-ecommerce_v4', // change this
    //   swDest: 'sw.js',
    //   navigateFallback: '/index.html',
    //   navigateFallbackWhitelist: [ /^\/[^\_]+\/?/ ],
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   runtimeCaching: [{
    //       urlPattern: new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
    //       handler: 'cacheFirst'
    //   },
    //   {
    //     urlPattern: new RegExp(process.env.FIREBASE_DB_URL),
    //     handler: 'networkFirst'
    //   },
    //   {
    //       urlPattern: /.*/,
    //       handler: 'networkFirst'
    //   }]
    // })
  ]
});
