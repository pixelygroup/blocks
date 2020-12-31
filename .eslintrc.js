module.exports = {
  root: true,
  'extends': [
    '@pixelygroup/eslint-config-px/all/vue',
  ],
  parserOptions: { parser: 'babel-eslint' },
  overrides: [
    {
      files: [
        '**/*.spec.{j,t}s?(x)',
      ],
      // extends: ["@pixelygroup/eslint-config-px/all/jest"],
      env: { jest: true },
    },
  ],
}
