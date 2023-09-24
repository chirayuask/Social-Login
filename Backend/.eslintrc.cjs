module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'consistent-return': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'max-len': ['error', { code: 128 }],
  },
};
