import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "*.config.js",
      "*.config.ts",
      "*.config.mjs",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        fetch: "readonly",
        Response: "readonly",
        Request: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // General rules
      "prefer-const": "warn",
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
      "no-unused-vars": "off", // Using @typescript-eslint/no-unused-vars instead
      "no-undef": "off", // TypeScript handles this
    },
  },
];
