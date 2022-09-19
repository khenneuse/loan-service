module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['.*\\.d\\.ts'],
  testMatch: ['<rootDir>/test/unit/**/*.ts'],

  preset: 'ts-jest',
  clearMocks: true,
};
