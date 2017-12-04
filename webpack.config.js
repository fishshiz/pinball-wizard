var path = require("path");

module.exports = {
    entry: "./entry.js",
    output: {
      path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
      filename: "bundle.js"
    },
    resolve: {
      extensions: ['.js', '*']
    },
    devtool: "source-map",
    module: {
      loaders: [
    {
      test: [/\.jsx?$/],
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }
  ]
    }
};
