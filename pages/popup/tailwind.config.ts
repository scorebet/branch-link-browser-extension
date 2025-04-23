import baseConfig from '@extension/tailwindcss-config'
import type { Config } from 'tailwindcss'

export default {
  ...baseConfig,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-green': '#058569',
        'brand-background-black': '#1D1E1F',
        'brand-subdued-primary': '#5A5C5D',
        'brand-link-default': '#02644F',
      },
    },
  },
} as Config
