module.exports = function (grunt) {
  grunt.initConfig({ exec });
  grunt.loadNpmTasks("grunt-exec");
  grunt.registerTask("lint", "Lint the source code", [
    "exec:cspell",
    "exec:eslint",
  ]);
  grunt.registerTask("format", "Format the source code", [
    "exec:prettier",
    "exec:csscomb",
  ]);
  grunt.registerTask("build", "Build a bundle", ["exec:webpack"]);
};

const exec = {
  cspell: 'npx cspell ".*" "*" "**/*"',
  csscomb: "npx csscomb . -t -v",
  eslint: "npx eslint . --fix --ignore-path .gitignore",
  prettier: "npx prettier . --write",
  webpack: "npx webpack -c app/webpack.config.js",
};
