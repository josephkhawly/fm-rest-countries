module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dm-element': '#2b3945',
        'dm-background': '#202c37',
        'lm-text': '#111517',
        'lm-input': '#858585',
        'lm-background': '#fafafa',
      },
      fontSize: {
        homepage: '14px',
        detail: '16px',
      },
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
