module.exports = function (grunt) {
  grunt.initConfig({ exec, concurrent });
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
    "test",
    "Sequentially run all unit and bdd test suites",
    "exec:karma"
  );
  grunt.registerTask(
    "build",
    "Build a production bundle",
    toExecs(["webpack"])
  );
  grunt.registerTask(
    "develop",
    "Build a bundle and serve in watch mode",
    "concurrent:develop"
  );
  grunt.registerTask(
    "publish",
    "Build and push an image",
    toExecs(["dockerBuild", "dockerPush"])
  );
};

const toExecs = (arr) => arr.map((i) => "exec:".concat(i));

const exec = {
  cspell: 'npx cspell ".*" "*" "**/*"',
  csscomb: "npx csscomb . -t -v",
  dockerBuild: "docker build . -t joellefkowitz/calculator:prod",
  dockerPush: "docker push joellefkowitz/calculator:prod",
  eslint: "npx eslint . --fix --ignore-path .gitignore",
  esw: "npx esw . -w --fix --ignore-path .gitignore",
  express: "node express/main.js",
  karma: "npx karma start app/karma.conf.js",
  prettier: "npx prettier . --write",
  webpack: "npx webpack -c app/webpack.config.js",
  webpackWatch: "npx webpack -c app/webpack.config.js --watch",
};

const concurrent = {
  develop: {
    tasks: toExecs(["esw", "webpackWatch", "express"]),
    options: {
      logConcurrentOutput: true,
    },
  },
};
