var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var webpack = require("webpack");

var plugins = [
  new ExtractTextPlugin({ filename: "../css/[name].bundle.css", allChunks: true }),
  new webpack.optimize.CommonsChunkPlugin({ name: "common", filename: "common.bundle.js" }),
];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    })
  );
} else {
  plugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    })
  );
}

module.exports = {
  entry: {
    common: ["react", "react-dom", "./src/client/layout/page.js"],
    main: "./src/client/pages/main/browser.js",
  },
  output: {
    path: path.join(__dirname, "./dist/static/js"),
    filename: "[name].bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        query: {
          babelrc: false,
          presets: ["react", "env"],
          plugins: [["transform-class-properties"], ["babel-plugin-transform-object-rest-spread"]],
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[local]_[hash:base64:5]",
                imports: true,
              },
            },
          ],
          fallback: "style-loader",
        }),
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]__[hash].[ext]",
            outputPath: "../assets/",
            useRelativePath: false,
          },
        },
      },
    ],
  },
  plugins: plugins,
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: [".js", ".jsx"],
  },
};
