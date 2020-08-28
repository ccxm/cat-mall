module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
        'space-before-function-paren': ['error', 'never'],
        'indent': 'off',
        // 'indent': ["error", 4, { SwitchCase: 1 }],
        'vue/script-indent': [
            'error',
            4,
            {
                'baseIndent': 1,
                'switchCase': 1
            }
        ]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
