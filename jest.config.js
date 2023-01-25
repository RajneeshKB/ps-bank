module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/setupJest.js'],
  coveragePathIgnorePatterns: [
    '/node_modules',
    '/src/context',
    '/src/hooks',
    '/src/utils',
    '/src/graphql',
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 75,
      lines: 85,
      statements: 85,
    },
  },
}
