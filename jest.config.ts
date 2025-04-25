import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '[/\\\\]e2e[/\\\\]'],
  transform: {
    '^.+\\.ts': 'ts-jest',
  },
}

export default config
