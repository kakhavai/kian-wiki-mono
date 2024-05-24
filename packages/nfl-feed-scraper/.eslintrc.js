// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: ['../../.eslintrc.js'], // <---- put your profile string here
  overrides: [
    {
      files: ['./src/prisma/MockPrismaSingleton.ts'],
      rules: {
        '@typescript-eslint/no-use-before-define': 'off',
      },
    },
  ],
};
