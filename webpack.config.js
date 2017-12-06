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
      test: [/\.jsx?$/, /\.js?$/],
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }
  ]
    }
};
