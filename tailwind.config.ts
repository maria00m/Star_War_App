// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    // Your app's files
    './app//*.{js,ts,jsx,tsx,mdx}',
    './pages//*.{js,ts,jsx,tsx,mdx}',
    './components//*.{js,ts,jsx,tsx,mdx}',

    // Crucial path for NextUI styles
    './node_modules/@nextui-org/theme/dist//*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // This enables class-based dark mode
  plugins: [nextui()], // This adds the NextUI plugin
}
export default config