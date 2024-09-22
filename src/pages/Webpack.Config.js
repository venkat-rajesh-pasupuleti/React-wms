//const { timers } = require('jquery');
const path = require('path');

module.exports = {
  entry: './src/index.js', // Your entry point
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/"),
      "timers": require.resolve("timers-browserify"),
      "util": require.resolve("util/"),
    "process": require.resolve("process/")

    },
  },
  // Other Webpack configurations...

 
};