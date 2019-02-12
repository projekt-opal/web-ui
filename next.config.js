const withCSS = require('@zeit/next-css');
const withImages = require('next-images')

module.exports = withImages(withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }
}));

// module.exports = {
//   webpack: config => {
//     // Fixes npm packages that depend on `fs` module
//     config.node = {
//       fs: 'empty'
//     }
//
//     return config
//   }
// }
