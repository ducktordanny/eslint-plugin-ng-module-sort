'use strict';

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:eslint-plugin/recommended',
    'plugin:node/recommended',
  ], 
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  rules: {
    'node/no-unsupported-features/es-syntax': ['error', {ignores: ['modules']}],
    'node/no-unpublished-require': [
      'error',
      {
        allowModules: ['@typescript-eslint/utils'],
      },
    ],
    'node/no-missing-import': 'off',
  },
  overrides: [
    {
      files: ['tests/**/*.ts'],
      env: {mocha: true},
    },
  ],
};
