module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: ["jest.config.js"],
  plugins: ["@typescript-eslint"],
  rules: {
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          // Domain層が依存してはいけない領域
          {
            from: "./src/Application/**/*",
            target: "./src/Domain/**/!(*.spec.ts|*.test.ts)",
            message: "Domain層でApplication層をimportしてはいけません。",
          },
          {
            from: "./src/Presentation/**/*",
            target: "./src/Domain/**/!(*.spec.ts|*.test.ts)",
            message: "Domain層でPresentation層をimportしてはいけません。",
          },
          {
            from: "./src/Infrastructure/**/*!(test).ts",
            target: "./src/Domain/**/!(*.spec.ts|*.test.ts)",
            message: "Domain層でInfrastructure層をimportしてはいけません。",
          },
          // Application層が依存してはいけない領域
          {
            from: "./src/Presentation/**/*",
            target: "./src/Application/**/!(*.spec.ts|*.test.ts)",
            message: "Application層でPresentation層をimportしてはいけません。",
          },
          {
            from: "./src/Infrastructure/**/*",
            target: "./src/Application/**/!(*.spec.ts|*.test.ts)",
            message:
              "Application層でInfrastructure層をimportしてはいけません。",
          },
        ],
      },
    ],
  },
  root: true,
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
