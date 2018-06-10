module.exports = {
  env: { node: true, jest: true },
  parser: "babel-eslint",
  plugins: ["babel"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  rules: {
    "no-use-before-define": "off",
    indent: ["warn", 2],
    "comma-dangle": [
      "warn",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "always-multiline",
      },
    ],
    quotes: ["warn", "double"],
    "sort-keys": ["warn", "asc", { natural: true }],
    "sort-imports": [
      "warn",
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "single", "multiple"],
      },
    ],
    "babel/semi": 1,
    "object-shorthand": ["warn", "always"],
    "no-alert": "off",
  },
};
