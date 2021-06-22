const toExecs = (arr) => arr.map((i) => "exec:".concat(i));

module.exports = function (grunt) {
  grunt.initConfig({
    exec: {
      cspell: 'npx cspell ".*" "*" "**/*"',
      csscomb: "npx csscomb . -t -v",
      dockerBuild: "docker build . -t joellefkowitz/calculator:prod",
      dockerPush: "docker push joellefkowitz/calculator:prod",
      eslint: "npx eslint . --fix --ignore-path .gitignore",
      eslintWatch: "npx esw . -w --fix --ignore-path .gitignore",
      express: "node express/main.js",
      karma: "npx karma start app/karma.conf.js --single-run",
      karmaWatch: "npx karma start app/karma.conf.js",
      prettier: "npx prettier . --write --ignore-path .gitignore",
      testCafe: "node express/e2e.js",
      webpack: "npx webpack -c app/webpack.config.js",
      webpackWatch: "npx webpack -c app/webpack.config.js --watch",
    },
    concurrent: {
      serve: {
        tasks: toExecs(["express", "webpackWatch"]),
        options: { logConcurrentOutput: true },
      },
    },
  });
  grunt.loadNpmTasks("grunt-exec");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.registerTask(
    "lint",
    "Lint the source code",
    toExecs(["cspell", "eslint"])
  );
  grunt.registerTask(
    "format",
    "Format the source code",
    toExecs(["prettier", "csscomb"])
  );
  grunt.registerTask(
    "build",
    "Build a production bundle",
    toExecs(["webpack"])
  );
  grunt.registerTask(
    "serve",
    "Build a bundle and serve in watch mode",
    "concurrent:serve"
  );
  grunt.registerTask(
    "test",
    "Sequentially run all unit test suites",
    toExecs(["karma"])
  );
  grunt.registerTask(
    "e2e",
    "Build a bundle and serve and sequentially run all e2e test suites",
    ["exec:webpack", "exec:testCafe"]
  );
  grunt.registerTask(
    "publish",
    "Build and push an image",
    toExecs(["dockerBuild", "dockerPush"])
  );
};
