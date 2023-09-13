import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  // collectCoverageFrom: ["<rootDir>/src/*"],
}

export default config
