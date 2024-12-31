module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['tsconfig.json', '.eslintrc.js'],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'prettier', 'import', 'perfectionist', 'unused-imports'],
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    'no-console': 'error',
    'no-underscore-dangle': 'off',
    'no-void': 'off',
    'global-require': 'off',
    'func-names': 'off',
    'consistent-return': 'off',
    'default-param-last': 'off',
    'lines-between-class-members': 'off',
    'dot-notation': 'off',
    'no-array-constructor': 'off',
    'no-loop-func': 'off',
    'no-shadow': 'off',
    'no-throw-literal': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true
      }
    ],
    'no-unused-vars': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['./*', '../*']
      }
    ],
    'no-restricted-syntax': [
      'error',
      'ForStatement',
      'ForInStatement',
      'ForOfStatement',
      'ContinueStatement',
      'DoWhileStatement',
      'WhileStatement',
      'WithStatement',
      {
        selector: 'MemberExpression[property.name=/findById*/]',
        message: 'Please use Model.findOne* instead.'
      }
    ],
    // 'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object', 'type'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'import/no-unresolved': 'error',
    '@typescript-eslint/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/dot-notation': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
    '@typescript-eslint/no-confusing-void-expression': [
      'warn',
      {
        ignoreArrowShorthand: true,
        ignoreVoidOperator: true
      }
    ],
    '@typescript-eslint/no-duplicate-enum-values': 'warn',
    '@typescript-eslint/no-loop-func': 'error',
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'warn',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-type-alias': [
      'error',
      {
        allowAliases: 'always',
        allowCallbacks: 'always',
        allowConditionalTypes: 'always',
        allowConstructors: 'always',
        allowLiterals: 'never',
        allowMappedTypes: 'never',
        allowTupleTypes: 'always',
        allowGenerics: 'always'
      }
    ],
    '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-useless-empty-export': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/prefer-includes': 'warn',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    // '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    // '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/require-array-sort-compare': 'error',
    '@typescript-eslint/unified-signatures': 'error',


    'prefer-destructuring': [
      1,
      {
        object: true,
        array: false
      }
    ],

    'unused-imports/no-unused-imports': 1,
    'unused-imports/no-unused-vars': [
      0,
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    'perfectionist/sort-named-exports': [
      1,
      {
        order: 'asc',
        type: 'line-length'
      }
    ],
    'perfectionist/sort-exports': [
      1,
      {
        order: 'asc',
        type: 'line-length'
      }
    ]
  }
}
