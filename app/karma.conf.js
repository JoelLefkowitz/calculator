module.exports = (config) => {
  config.set({
    browsers: ["ChromeHeadless"],
    colors: true,
    files: [{ pattern: "tests/**/*.spec.js", watched: false }],
    frameworks: ["chai", "mocha", "webpack"],
    port: 9876,
    preprocessors: { "tests/**/*.spec.js": ["webpack"] },
    reporters: ["mocha"],
    singleRun: true,
    webpack: {
      module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
        ],
      },
    },
  });
};
