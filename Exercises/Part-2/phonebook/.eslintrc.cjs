module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    "react/prop-types": [
      "error",
      {
        ignore: [], // Specify the components you want to ignore
        customValidators: [], // Specify any custom prop type validators
        skipUndeclared: true, // Whether to skip prop types validation for undeclared components
      }
    ],
    
  },
}
