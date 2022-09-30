module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    semi: ['error', 'never'],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-param-reassign': 0,
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
}
