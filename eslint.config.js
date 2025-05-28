import globals from 'globals'
import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import * as tseslint from 'typescript-eslint'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  resolvePluginsRelativeTo: import.meta.dirname,
})

const react = {
  ...eslintPluginReact.configs.recommended,
  rules: {
    ...eslintPluginReact.configs.recommended.rules,
    'react/prop-types': 'off',
  },
}

const reactHooks = eslintPluginReactHooks
const reactRefresh = eslintPluginReactRefresh
const jsxA11y = eslintPluginJsxA11y
const prettier = eslintConfigPrettier

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parser: tseslint.parser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginJsxA11y.configs.recommended.rules,
      'react/prop-types': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': 'warn', // ⬅️ Aquí Prettier actúa como linter
    },
  }
)
