const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'Bethel Christian Center Dashboard',
    themeColor: '#4637b0',
    msTileColor: '#4637b0',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#4637b0'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
