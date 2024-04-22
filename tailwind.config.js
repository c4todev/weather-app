/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: [
        "0.75rem",
        {
          lineHeight: "140%",
          fontWeight: ["400", "700"],
        },
      ],
      sm: [
        "0.875rem",
        {
          lineHeight: "140%",
          fontWeight: "400",
        },
      ],
      md: [
        "1rem",
        {
          lineHeight: "140%",
          fontWeight: "400",
        },
      ],
      lg: [
        "1.25rem",
        {
          lineHeight: "140%",
          fontWeight: "400",
        },
      ],
      "heading-xs": [
        "0.875rem",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "heading-sm": [
        "1rem",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "heading-md": [
        "1.25rem",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "heading-lg": [
        "2rem",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "heading-xl": [
        "3rem",
        {
          lineHeight: "120%",
          fontWeight: "800",
        },
      ],
      "heading-hg": [
        "6rem",
        {
          lineHeight: "100%",
          fontWeight: "800",
        },
      ],
    },
    extend: {
      animation: {
        spin: "spin 1s ease-out infinite",
        pulse: "pulse 5s ease-in-out infinite",
      },
      colors: {
        product: "#8FB2F5",
        base: {
          100: "#FAFAFA",
          200: "#BFBFD4",
          300: "#ABABC4",
          400: "#7F7F98",
          500: "#3B3B54",
          600: "#22222F",
          700: "#1C1C27",
          800: "#16161F",
          900: "#13131A",
        },
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      backgroundImage: {
        pattern: "url('/Background.png')",
        clearday: "url('/clear-day.png')",
        fewcloudsday: "url('/few-day.png')",
        cloudsday: "url('/clouds-day.png')",
        rainday: "url('/rain-day.png')",
        stormDay: "url('/storm-day.png')",
        clearnight: "url('/clear-night.png')",
        fewcloudsnight: "url('/few-night.png')",
        cloudsnight: "url('/clouds-night.png')",
        rainnight: "url('/rain-night.png')",
        stormnight: "url('/storm-night.png')",
      },
    },
  },
  plugins: [],
};
