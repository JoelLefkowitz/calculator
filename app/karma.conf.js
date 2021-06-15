const path = require('path');
const webpack = require('./webpack.config.test');
const entrypoint = path.resolve(__dirname, 'src', 'test.ts');

module.exports = (config) => {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'webpack'],
    reporters: ['spec', 'coverage-istanbul'],
    files: [entrypoint],
    preprocessors: { [entrypoint]: ['webpack'] },
    webpack,
    webpackMiddleware: { noInfo: true },
    coverageIstanbulReporter: {
      reports: ['cobertura', 'text-summary', 'html'],
      dir: path.join(__dirname, 'coverage'),
      fixWebpackSourcePaths: true,
    },
  });
};
