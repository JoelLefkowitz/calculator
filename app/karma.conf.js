const _ = require('lodash');
const path = require('path');
const webpack = require(path.resolve(__dirname, 'webpack.config.js'));

module.exports = (config) => {
  config.set({
    browsers: ['ChromeHeadless'],
    colors: true,
    files: [{ pattern: 'src/**/*.spec.ts', watched: false }],
    frameworks: ['chai', 'mocha', 'webpack'],
    port: 9876,
    preprocessors: { 'src/**/*.spec.ts': ['webpack'] },
    reporters: ['dots'],
    webpack: _.pick(webpack, 'module', 'resolve'),
  });
};
