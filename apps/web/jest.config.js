const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  preset: 'jest-presets/react',
  setupFilesAfterEnv: ['<rootDir>/jest.setup'],
  moduleDirectories: ['node_modules', '<rootDir>/']
};

module.exports = createJestConfig(customJestConfig);
