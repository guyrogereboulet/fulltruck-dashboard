/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:

    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text_color: '#334466',
        primary_color: '#f94034',
      },
    },
    screens: {
      tablet: { max: '768px' },
      mobilelg: { max: '650px' },
      forCards: { max: '875px' },
      tabletlg: { max: '992px' },
      desktop: { max: '1415px' },
      lgDesktopMin: { min: '1570px' },
      mobile: { max: '575px' },
      // For min width
      minTabletlg: { min: '1200px' },
      maxTabletlg: { min: '1200px' },
    },
  },
  plugins: [],
}
