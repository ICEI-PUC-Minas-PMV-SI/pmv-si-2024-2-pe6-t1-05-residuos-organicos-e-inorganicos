/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/tests/setup-env.ts'],
  transform: {
    '^.+.ts?$': ['ts-jest', {}],
  },
};
