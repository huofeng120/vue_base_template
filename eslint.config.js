import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettierConfig from 'eslint-config-prettier'

export default [
  // 全局忽略文件
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.config.js',
      '*.config.ts',
      '.husky/**',
      'public/**'
    ]
  },

  // JavaScript/TypeScript 推荐规则
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Vue 3 推荐规则（使用 flat 格式）
  ...pluginVue.configs['flat/recommended'],

  // Vue 文件中的 TypeScript 支持
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },

  // 自定义规则覆盖
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ],
      'vue/multi-word-component-names': 'off'
    }
  },

  // Prettier 兼容（必须放在最后）
  prettierConfig
]
