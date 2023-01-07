const path = require("path");
const miniCss = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");

const getHtml = (name) =>
  fs.readFileSync(__dirname + `/src/templates/${name}.html`);

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 4200,
    liveReload: true,
    hot: true,
    static: "./src",
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [miniCss.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: "index.html", //relative to root of the application
      template: "./src/index.html",

      header: getHtml("header"),
      welcome: getHtml("welcome"),
      services: getHtml("services"),
      examples: getHtml("examples"),
      examples: getHtml("contacts"),
    }),

    new miniCss({
      filename: "style.css",
    }),
  ],
};
