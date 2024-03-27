// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  ignorePatterns: ['build/'],
  extends: [
    '@rushstack/eslint-config/profile/node',
    '@rushstack/eslint-config/mixins/friendly-locals',
    '@rushstack/eslint-config/mixins/tsdoc',
  ], // <---- put your profile string here
  parserOptions: { tsconfigRootDir: __dirname },
  overrides: [
    {
      files: ['./src/prisma/MockPrismaSingleton.ts'],
      rules: {
        '@typescript-eslint/no-use-before-define': 'off',
      },
    },
  ],
};
