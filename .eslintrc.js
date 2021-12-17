module.exports = {
	"parser": "@babel/eslint-parser",
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:jsx-a11y/recommended",
    ],
	"plugins": ["react", "jest", "react-hooks"],
	"env": {
		"browser": true,
		"jest": true,
		"node": true
	},
	"globals": {
		"rootRequire": true,
		"io": true,
		"BigInt": true
	},
	"settings": {
    "import/ignore": ["react-native"]
  },
	"rules": {
        "react/react-in-jsx-scope": "off",
        "react/jsx-filename-extension": [
            1,
            {
                "extensions": [
                    ".js",
                    ".jsx"
                ]
            }
        ],
		"react/display-name": 1,
		"react/prop-types": "off"
		// "key-spacing": 0,
		// "jsx-quotes": [2, "prefer-double"],
		// "max-len": [2, 160, 2],
		// "object-curly-spacing": [2, "always"],
		// "indent": [2, "tab", { "SwitchCase": 1, "ObjectExpression": "off" }],
		// "no-tabs": 0,
		// "no-var": 2,
		// "react/jsx-indent": [2, "tab"],
		// "react/jsx-indent-props": [2, "tab"],
		// "react/no-unused-prop-types": [0],
		// "space-before-function-paren": [0]
	}
};


