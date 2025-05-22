/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { nunito: "Nunito" },
    },
    colors: {
      grey: { 100: "#808080", 200: "#323232", 300: "#212121" },
      white: "#fff",
      cyan: "#14ffec",
      green: "#25da72",
    },
    fontSize: { sm: "14px", md: "18px", lg: "24px", xl: "32px", base: "16px" },
  },
  plugins: [],
};
