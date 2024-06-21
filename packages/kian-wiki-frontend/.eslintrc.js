require('@rushstack/eslint-config/patch/modern-module-resolution');
const path = require('path');

module.exports = {
  extends: [
    'next/core-web-vitals',
    '@rushstack/eslint-config/mixins/react',
    '../../.eslintrc.js', // Path to your main ESLint configuration file
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
  // Additional rules or overrides for this specific directory can go here
};
