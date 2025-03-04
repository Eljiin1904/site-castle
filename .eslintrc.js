module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern JavaScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "@typescript-eslint/no-unused-vars": ["warn"],  // Temporarily set unused variable as warning
    "@typescript-eslint/no-explicit-any": ["warn"], // Temporarily set any type as warning
    "react/prop-types": "off", // Disable prop-types as we are using TypeScript
    // '@typescript-eslint/no-explicit-any': 'off', // Handles any type error,
    '@typescript-eslint/no-namespace': 'off', // Disable 2015 namespace warning  rule globally
    // "@typescript-eslint/no-unused-vars" : 'off', // Disable unused variable rule,
    "@typescript-eslint/ban-types": "off", // Disable Don't use {}as a type.{} warning
    "@typescript-eslint/no-array-constructor" : "off" // Handles issues with Array()
  },
  settings: {
    react: {
      version: "detect", // Automatically detects the react version
    },
  },
};
