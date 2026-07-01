import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    'out/**',
    'node_modules/**',
    // Cloudflare Pages Functions run in the Workers runtime, not the Next app —
    // don't lint them with the React/Next config.
    'functions/**',
  ]),
  {
    rules: {
      // `_`-prefixed bindings mark intentionally dropped values (e.g. pulling
      // a prop out of a rest spread so it never reaches the DOM).
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: [
      'workers/**',
      'components/page-loader.tsx',
      'components/hero.tsx',
      'components/review-overlay.tsx',
      'components/newsletter-popup.tsx',
      'components/navigation.tsx',
    ],
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/immutability': 'off',
    },
  },
])
