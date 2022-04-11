let common = [
  "-f @cucumber/pretty-formatter",
  "--publish-quiet",
  "cypress/integration/dashboard/**/*.feature",
].join(" ");

module.exports = {
  default: `${common}`,
  ethics: `pages/ethics/pledge-works/features/*.feature ${common}`,
};
