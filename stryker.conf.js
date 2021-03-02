/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  mutator: "javascript",
  packageManager: "npm",
  reporters: ["clear-text", "progress"],
  testRunner: "jest",
  transpilers: [],
  coverageAnalysis: "all",
  mutate: ["index.js"],
};
