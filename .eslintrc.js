module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'max-len': 'off',
    'template-curly-spacing': 'off',
    indent: 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': [2, { props: false }],
    // https://cn.eslint.org/docs/rules/no-param-reassign
    'linebreak-style': ['off', 'windows'],
    // https://blog.csdn.net/weixin_42342975/article/details/81486373
    'arrow-body-style': 'off',
    // https://cn.eslint.org/docs/rules/arrow-body-style
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      },
    ],
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    // https://eslint.bootcss.com/docs/4.0.0/rules/camelcase#when-not-to-use-it
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    // https://cn.eslint.org/docs/rules/prefer-destructuring
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'import/order': 'off', // 或自訂排序邏輯
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
      },
    },
  },
};
