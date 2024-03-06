module.exports = {
  env: { es2020: true, node: true },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    allowImportExportEverywhere: true
  },
  plugins: ['prettier'],
  rules: {
    'no-console': 1,
    'no-extra-boolean-cast': 0,
    'no-lonely-if': 1,
    'no-unused-vars': 1,
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        printWidth: 120,
        singleQuote: true,
        useTabs: false,
        tabWidth: 2,
        trailingComma: 'none',
        endOfLine: 'auto'
      }
    ]
  }
}
