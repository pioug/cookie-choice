const string = require("rollup-plugin-string");

module.exports = {
  input: "main.js",
  plugins: [
    string({
      include: ["consent.js", "consent-noop.js"]
    })
  ],
  output: {
    file: "cloudflare-worker.js",
    format: "esm"
  }
};
