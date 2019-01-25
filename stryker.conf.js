module.exports = function(config) {
  config.set({
    mutate: [
      "index.js"
    ],
    testRunner: "jest",
    mutator: "javascript",
    transpilers: [],
    reporters: ["clear-text", "progress"],
    coverageAnalysis: "all"
  });
};
