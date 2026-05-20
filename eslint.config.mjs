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
    'public/videos/_orig/**',
  ]),
  {
    files: [
      'components/ui/**',
      'hooks/**',
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
