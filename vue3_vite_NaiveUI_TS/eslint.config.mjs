import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import _import from "eslint-plugin-import";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import parser from "vue-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/.DS_Store",
        "**/node_modules/",
        "**/dist",
        "**/dist-ssr",
        "**/*.local",
        "**/package-lock.json",
        "**/components.ts",
        "**/components.d.ts",
        "**/logs",
        "**/*.log",
        "**/npm-debug.log*",
        "**/yarn-debug.log*",
        "**/yarn-error.log*",
        "**/pnpm-debug.log*",
        "**/lerna-debug.log*",
        "**/.vscode/*",
        "!**/.vscode/extensions.json",
        "**/.idea",
        "**/*.suo",
        "**/*.ntvs*",
        "**/*.njsproj",
        "**/*.sln",
        "**/*.sw?",
        "**/auto-import.d.ts",
        "**/pnpm-lock.yaml",
        "**/yarn.lock",
        "**/.eslintcache"
    ],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        prettier,
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.browser,
            jest: "readonly",
            window: true,
        },

        parser: parser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            parser: "@typescript-eslint/parser",

            ecmaFeatures: {
                jsx: true,
                tsx: true,
            },
        },
    },

    rules: {
        "no-console": "off",
        "no-debugger": "off",
        "no-var": 2,
        "prefer-const": 2,
        "no-unused-vars": 0,
        "arrow-parens": 0,
        "comma-dangle": 0,
        "no-underscore-dangle": 0,
        "no-undef": 0,
        camelcase: 0,
        quotes: [0, "single"],
        "quote-props": [0, "always"],
        semi: [0, "always"],
        "max-classes-per-file": [0, "always"],
        "linebreak-style": [0, "windows"],
        "no-param-reassign": 0,
        "no-plusplus": 0,
        "max-len": 0,
        "@typescript-eslint/no-explicit-any": ["off"],

        "@typescript-eslint/no-unused-vars": ["warn", {
            varsIgnorePattern: ".*",
            args: "none",
        }],

        "vue/multi-word-component-names": "off",
        "vue/no-v-html": "off",
        "vue/attributes-order": "off",
        "vue/attribute-hyphenation": "off",
        "vue/v-on-event-hyphenation": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "vue/require-default-prop": "off",
        "vue/comment-directive": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/triple-slash-reference": "off",
    },
}, {
    files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],

    languageOptions: {
        globals: {
            ...globals.jest,
        },
    },
}];
