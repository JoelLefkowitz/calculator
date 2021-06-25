module.exports = (grunt) => {
  grunt.initConfig({ exec, concurrent });
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

const comprehension = (obj, cb) =>
  Object.fromEntries(Object.entries(obj).map(cb));

const cwd = (arr, dir) =>
  comprehension(arr, ([k, v]) => [k, { cmd: v, cwd: dir }]);

const global = {
  cspell: 'npx cspell ".*" "*" "**/*"',
  csscomb: "npx csscomb . -t -v",
  eslint: "npx eslint . --fix --ignore-path .gitignore",
  eslintWatch: "npx esw . -w --fix --ignore-path .gitignore",
  prettier: "npx prettier . --write --ignore-path .gitignore",
  remark: "npx remark -r .remarkrc . .github",
};

const mount = "-i --rm -v $(pwd):/wd";
const testCafe = "testcafe/testcafe:1.14.2";

const calculator = {
  express: "node express/main.js",
  karma: "npx karma start karma.conf.js --single-run",
  karmaWatch: "npx karma start karma.conf.js",
  testCafe: `docker run ${mount} --entrypoint node ${testCafe} wd/express/e2e.js`,
  testCafeLocal: "node express/e2e.js",
  webpack: "npx webpack -c webpack.config.js",
  webpackWatch: "npx webpack -c webpack.config.js --watch",
};

const exec = { ...global, ...cwd(calculator, "calculator") };

const concurrent = {
  serve: {
    tasks: toExecs(["express", "webpackWatch"]),
    options: { logConcurrentOutput: true },
  },
};
