module.exports = {
    root: true,
    env: {
      node: true,
      'vue/setup-compiler-macros': true
    },
    extends: [
      'plugin:vue/vue3-recommended',
      'standard'
    ],
    overrides: [
      {
        files: [
          '**/?(*.)test.[jt]s?(x)'
        ],
        env: {
          jest: true
        }
      }
    ],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'vue/order-in-components': ['error', {
        order: [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          ['provide', 'inject'],
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'emits',
          'setup',
          'asyncData',
          'data',
          'fetch',
          'head',
          'computed',
          'watch',
          'watchQuery',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError'
        ]
      }],
      'vue/require-prop-types': 'error',
      'vue/require-default-prop': 'error',
      'vue/this-in-template': ['error', 'never'],
      'vue/html-self-closing': [
        'error', {
          html: {
            void: 'never',
            normal: 'never',
            component: 'never'
          },
          svg: 'never',
          math: 'never'
        }
      ],
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: false,
        ignores: ['/^router-/', '/^keep-/', '/^transition/', '/^component/']
      }],
      // vue 檔案名稱需要為多字
      'vue/multi-word-component-names': ['error', {
        ignores: ['index']
      }],
      // script setup 變數自動 return 所以不一定需要使用
      'vue/script-setup-uses-vars': 'error'
    }
  }
  