import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import _import from 'eslint-plugin-import';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
   baseDirectory: __dirname,
   recommendedConfig: js.configs.recommended,
   allConfig: js.configs.all,
});

export default defineConfig([
   globalIgnores(['**/.eslintrc.js', '**/healthcheck.js']),
   {
      extends: fixupConfigRules(
         compat.extends(
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended',
            'plugin:import/recommended',
            'plugin:import/typescript',
         ),
      ),
      plugins: {
         '@typescript-eslint': fixupPluginRules(typescriptEslintEslintPlugin),
         import: fixupPluginRules(_import),
      },
      languageOptions: {
         globals: {
            ...globals.node,
            ...globals.jest,
         },
         parser: tsParser,
         ecmaVersion: 5,
         sourceType: 'module',
         parserOptions: {
            project: 'tsconfig.json',
            tsconfigRootDir: './',
         },
      },
      rules: {
         'prettier/prettier': 'warn',
         '@typescript-eslint/explicit-function-return-type': 'off',
         '@typescript-eslint/explicit-module-boundary-types': 'off',
         '@typescript-eslint/interface-name-prefix': 'off',
         '@typescript-eslint/no-explicit-any': [
            'error',
            {
               fixToUnknown: false,
            },
         ],
         '@typescript-eslint/no-unused-vars': 'error',
         '@typescript-eslint/no-floating-promises': 'error',
         'max-len': [
            'warn',
            {
               code: 120,
            },
         ],
         'no-console': 'error',
         'no-debugger': 'error',
         'prefer-const': 'warn',
         semi: ['error', 'always'],
         camelcase: ['warn'],
         'sort-imports': [
            'error',
            {
               ignoreCase: false,
               ignoreDeclarationSort: true,
               ignoreMemberSort: false,
               memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
               allowSeparatedGroups: true,
            },
         ],
         'import/no-unresolved': 'error',
         'import/order': [
            'warn',
            {
               groups: [
                  'builtin',
                  'external',
                  'internal',
                  ['sibling', 'parent'],
                  'index',
                  'unknown',
               ],
               'newlines-between': 'always',
               alphabetize: {
                  order: 'asc',
                  caseInsensitive: true,
               },
            },
         ],
      },
   },
]);
