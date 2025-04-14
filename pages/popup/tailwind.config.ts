import baseConfig from '@extension/tailwindcss-config'
import type { Config } from 'tailwindcss'

export default {
  ...baseConfig,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-green': '#058569',
      },
    },
  },
} as Config
