import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',

  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },

  clearMocks: true,

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },

  transformIgnorePatterns: ['node_modules/(?!.*\\.(ts|tsx|js|jsx)$)'],

  moduleFileExtensions: ['ts', 'js', 'json'],

  testEnvironment: 'node',
};

export default config;
