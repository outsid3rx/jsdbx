const { configure } = require('eslint-kit')

module.exports = {
  ...configure({
    root: __dirname,
    extends: '../../.eslintrc.cjs',
  }),
  rules: {
    'import-x/no-unresolved': 'off',
  },
}
