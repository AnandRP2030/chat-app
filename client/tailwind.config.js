
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        chatGray: {
          "500": "#262626"
        },
        chatWhite: {
          "600": "#fafafa"
        },
        chatBlack: {
          "600": "#262626"
        }
      }
    },
  },
  plugins: [],
}
