module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"]
  },
  globals: {
    sinon: true,
    expect: true
  }
};
