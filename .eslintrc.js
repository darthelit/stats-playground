module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "env": {
        "node": true,
        "browser": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "parser": "babel-eslint",
    "plugins": [
        "react",
    ],
    "globals": {
        "should": true,
        "sinon": true
    },
    rules: {
        "no-console": "off"
    }
};