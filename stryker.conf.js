module.exports = function(config) {
  config.set({
    files: [
      {
        pattern: "index.js",
        mutated: true,
        included: false
      },
      "package.json",
      "test/fixtures/*.css",
      "test/**/*.js"
    ],
    testRunner: "jest",
    mutator: "javascript",
    transpilers: [],
    reporter: ["clear-text", "progress"],
    coverageAnalysis: "all"
  });
};
