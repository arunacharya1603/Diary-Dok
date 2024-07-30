/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #274046, #E6DADA)',
        'custom-gradient1': 'linear-gradient(to right, #182848, #4b6cb7)',
        'custom-radial': 'radial-gradient(ellipse at bottom, rgba(71, 81, 92, 1) 0%, rgba(11, 21, 30, 1) 45%)',
        'custom-linear': 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%)',
      },
      boxShadow: {
        'custom-inset': 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.15, 0.83, 0.66, 1)',
      },
    },
  },
  plugins: [],
}
