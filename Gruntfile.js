module.exports = function (grunt) {
  grunt.initConfig({
    exec: {
      cspell: 'npx cspell ".*" "*" "**/*"',
      csscomb: "npx csscomb . -t -v",
      eslint: "npx eslint . --fix --ignore-path .gitignore",
      eslintWatch: "npx esw . -w --fix --ignore-path .gitignore",
      express: "node express/main.js",
      karma: "npx karma start app/karma.conf.js --single-run",
      karmaWatch: "npx karma start app/karma.conf.js",
      prettier: "npx prettier . --write --ignore-path .gitignore",
      remark: "npx remark -r .remarkrc . .github",
      testCafe: dockerRun("testcafe/testcafe", ["node", "wd/express/e2e.js"]),
      testCafeLocal: "node express/e2e.js",
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
    toExecs(["cspell", "remark", "eslint"])
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
    "test",
    "Sequentially run all unit test suites",
    toExecs(["karma"])
  );
  grunt.registerTask(
    "e2e",
    "Build a bundle and serve and sequentially run all e2e test suites",
    toExecs(["webpack", "testCafe"])
  );
  grunt.registerTask(
    "serve",
    "Build a bundle and serve in watch mode",
    "concurrent:serve"
  );
};

const toExecs = (arr) => arr.map((i) => "exec:".concat(i));

const dockerRun = (image, entrypoint) => `
    docker run -i --rm -v $(pwd):/wd --entrypoint ${entrypoint.shift()}
    ${image} ${entrypoint.join(" ")}
  `;
