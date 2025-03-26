/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
  extend: {
    colors:{
      main: "#0E9F6E",
      secondary: "",
      
    },
    container:{
      center: true,
      padding: "1rem",
    },
  }
  },
  plugins: [
    flowbite.plugin(),
  ],
}
