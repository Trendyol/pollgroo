module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePathIgnorePatterns: [
    "<rootDir>/test/__fixtures__",
    "<rootDir>/node_modules",
    "<rootDir>/dist",
    "<rootDir>/playwright"
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom"
};
