import baseConfig from '@extension/tailwindcss-config'
import { withUI } from '@extension/ui'

export default withUI({
  ...baseConfig,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-green-link': '#02644F',
        'brand-background-green': '#ECF5EC',
      },
    },
  },
})
