module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "plugin:react/recommended",
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        'global-require': 0,
        'react/jsx-filename-extension': [
            1,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/member-delimiter-style': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-empty-function': ['warn'],
        '@typescript-eslint/explicit-module-boundary-types': 0,
        'array-callback-return': 0,
        'jsx-quotes': ['error', 'prefer-double'],
        '@typescript-eslint/no-explicit-any': 0,
        'react/self-closing-comp': 1,
        'react/prop-types': 0,
        'react/display-name': 0,
        '@typescript-eslint/no-var-requires': 0,
    }
}
