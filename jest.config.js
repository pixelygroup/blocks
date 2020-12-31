module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  transformIgnoreBlocks: [
  ],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/components/**/*.{js,vue}'],
  testMatch: ['<rootDir>/src/components/**/*.spec.[jt]s?(x)'],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
