const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtensionReloader = require("webpack-extension-reloader");

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "./src"),
  devtool: false,
  // distにビルドするjs/tsファイルを書き連ねる
  entry: {
    options: "./scripts/options.ts",
    content: "./scripts/content.ts",
    index: "./scripts/index.ts",
    // background moved to copy section because hot extension reloader pluging doesn"t work with bundled code that refers to window object
    // see more https://github.com/rubenspgcavalcante/webpack-extension-reloader/issues/125
    // background: "./scripts/background.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    publicPath: "./",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  plugins: [
    new ExtensionReloader(),
    new CopyWebpackPlugin({
      patterns: [
        // { from: "assets", to: "assets" },
        { from: "styles", to: "styles" },
        { from: "manifest.json", to: "manifest.json" },
        { from: "rules.json", to: "rules.json" },
        { from: "scripts/background.ts", to: "background.js" },
      ],
    }),
    new HtmlWebpackPlugin({
      title: "Options",
      template: "./html/options.html",
      filename: "options.html",
      chunks: ["options"],
    }),
    new HtmlWebpackPlugin({
      title: "Index",
      template: "./html/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
  ],
};
