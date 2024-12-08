/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#146EB4",
        customBlueDeep: "#0E4F82", // Add your custom color value here
      },
    },
  },
  plugins: [],
};
