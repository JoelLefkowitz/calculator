const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const src = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "production",
  entry: path.join(src, "main.js"),
  output: { path: dist, filename: "bundle.js" },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.join(src, "static"), to: dist },
        { from: path.join(src, "assets"), to: path.join(dist, "assets") },
      ],
    }),
  ],
};
