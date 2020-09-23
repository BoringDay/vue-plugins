module.exports = {
  rules: {
    'no-console': 0,
    'no-unused-vars': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential'],
  parserOptions: {
    parser: 'babel-eslint'
  }
}
