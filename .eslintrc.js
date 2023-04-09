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
    allowImportExportEverywhere: true
  },
  rules: {
    'node/no-unsupported-features/es-syntax': [
      'error',
      {ignores: ['modules']},
    ],
    'node/no-unpublished-import': ['error', {ignores: ['modules']}]
  },
  overrides: [
    {
      files: ['tests/**/*.ts'],
      env: { mocha: true },
    },
  ],
};
