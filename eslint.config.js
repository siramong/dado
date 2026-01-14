// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    files: ['components/**/*.tsx', 'components/**/*.ts'],
    rules: {
      'react/no-unknown-property': 'off',
    },
  },
]);
