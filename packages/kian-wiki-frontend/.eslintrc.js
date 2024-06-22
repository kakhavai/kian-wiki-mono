require('@rushstack/eslint-config/patch/modern-module-resolution');
const path = require('path');

module.exports = {
  extends: [
    'next/core-web-vitals',
    '@rushstack/eslint-config/mixins/react',
    '../../.eslintrc.js',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [path.resolve(__dirname, './tsconfig.json')],
  },
  rules: {
    '@next/next/no-html-link-for-pages': [
      'error',
      'packages/kian-wiki-frontend',
    ],
  },
};
