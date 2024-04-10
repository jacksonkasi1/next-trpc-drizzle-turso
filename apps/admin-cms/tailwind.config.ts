import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}", // must use this line to compile and generate our RizzUI components style
  ],
  theme: {
    darkMode: ["class", '[data-theme="dark"]'],
  },
};
export default config;
