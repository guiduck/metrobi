export default {
  testEnvironment: "jest-environment-jsdom",
  extensionsToTreatAsEsm: [".jsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx)$": [
      "babel-jest",
      { presets: ["@babel/preset-env", "@babel/preset-react"] },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!(.*\\.mjs$))"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleFileExtensions: ["js", "jsx"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(js|jsx)",
    "<rootDir>/src/**/*.(test|spec).(js|jsx)",
  ],
};
