module.exports = {
  env: {
    node: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  globals: {
    require: 'readonly',
    module: 'readonly'
  }
}; 