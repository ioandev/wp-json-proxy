module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  "moduleDirectories": [
    "node_modules"
  ],
  moduleFileExtensions: [
    'ts',
    'js',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/**/*.js',
  ],
  "coverageReporters": ["lcov", "text-summary"],
  "snapshotSerializers": ["jest-serializer-html"],
}
