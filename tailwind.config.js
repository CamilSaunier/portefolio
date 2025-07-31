/* eslint-env node */
/* eslint-disable no-undef */
const daisyui = require("daisyui");

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["bg-[url('/white_montain.jpeg')]", "dark:bg-[url('/black_montain.jpeg')]"],
  theme: { extend: {} },
  plugins: [daisyui],
  daisyui: {},
};
