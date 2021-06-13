const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const path = require("path");

const src = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "production",
  entry: path.join(src, "main.ts"),
  output: { path: dist, filename: "bundle.js" },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlPlugin({
      hash: true,
      template: path.join(src, "index.ejs"),
    }),
    new CopyPlugin({
      patterns: [
        { from: path.join(src, "static"), to: dist },
        { from: path.join(src, "assets"), to: path.join(dist, "assets") },
      ],
    }),
  ],
};
