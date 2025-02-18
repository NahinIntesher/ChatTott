import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  darkMode: "class", // Using class-based dark mode
  theme: {
    extend: {
      colors: {
        "login-box-bg": "var(--bg-light)",
        "card-border-light": "var(--card-border-light)",
        "button-bg-light": "var(--button-bg-light)",
        "button-hover-light": "var(--button-hover-light)",
        "border-login": "var(--border-light)",

        bg: "var(--bg)",
        text: "var(--text)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        sidebar: "var(--sidebar-bg)",
        header: "var(--header-bg)",
        notif: "var(--notif-bg)",
        "card-bg": "var(--card-bg)",
        "card-border": "var(--card-border)",
        border: "var(--border)",
        button: "var(--button-bg)",
        "button-border": "var(--button-border)",
        "button-hover": "var(--button-hover)",
      },
    },
  },
  plugins: [],
};

export default config;
