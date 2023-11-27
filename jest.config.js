module.exports = {
  preset: "ts-jest/presets/default",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  testRegex: "(/tests/.*\\.(test|spec))\\.[jt]sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
