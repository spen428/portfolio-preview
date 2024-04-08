const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin.js");

function printOrMinWidth(minWidth) {
  return { raw: `print,(min-width: ${minWidth})` };
}

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Noto Sans",
      serif: "Noto Serif",
      mono: "Noto Sans Mono",
      cursive: "Brush Script MT",
    },
    screens: {
      "2xs": "425px",
      xs: "576px",
      sm: "640px",
      md: "768px",
      lg: printOrMinWidth("960px"),
      xl: printOrMinWidth("1280px"),
      "2xl": printOrMinWidth("1536px"),
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      primary: {
        50: "#faf7fc",
        100: "#f4edfa",
        200: "#e9daf4",
        300: "#d8bdea",
        400: "#c296dc",
        500: "#a66dc8",
        600: "#8a4dac",
        700: "#733e8d",
        800: "#5f3474",
        900: "#522f60",
        950: "#421c52",
      },
      secondary: {
        50: "#f2fbf2",
        100: "#e1f7e2",
        200: "#c4eec5",
        300: "#97df99",
        400: "#61c764",
        500: "#3bac3f",
        600: "#2c8d30",
        700: "#266f29",
        800: "#225925",
        900: "#1e4921",
        950: "#0b280d",
      },
      "primary-toned": {
        50: "#faf9fa",
        100: "#f4f2f5",
        200: "#e7e3eb",
        300: "#d6cdda",
        400: "#bdafc3",
        500: "#a08da8",
        600: "#826f8a",
        700: "#715f78",
        800: "#594b5d",
        900: "#4b404f",
        950: "#2c232f",
      },
      gray: {
        50: "#f7f7f7",
        100: "#efefef",
        200: "#dfdfdf",
        300: "#cfcfcf",
        400: "#bfbfbf",
        500: "#696969",
        600: "#5b5b5b",
        700: "#4d4d4d",
        800: "#3f3f3f",
        900: "#313131",
        950: "#2a2a2a",
      },
    },
    extend: {
      aspectRatio: { golden: "16 / 10" },
      animation: {
        fadeIn: "fade 2s ease-out",
        saturateIn: "saturate 3s ease-out",
        fade: "fade 5s linear alternate 2",
        sideToSide: "sideToSide 5s ease-in-out alternate infinite",
        wiggle: "wiggle 50ms linear alternate 12",
        tease: "tease 4s linear infinite",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        saturate: {
          "0%": { filter: "saturate(0)" },
          "100%": { opacity: "saturate(1)" },
        },
        sideToSide: {
          "0%": { rotate: "0 1 0 -30deg" },
          "50%": { rotate: "0 1 0 0deg" },
          "100%": { rotate: "0 1 0 30deg" },
        },
        wiggle: {
          "0%": { rotate: "-1deg" },
          "100%": { rotate: "1deg" },
        },
        tease: {
          "0%": { rotate: "0deg", translate: "0rem" },
          "3%": { rotate: "-5deg", translate: "-0.25rem" },
          "6%": { rotate: "5deg", translate: "0.25rem" },
          "9%": { rotate: "-5deg", translate: "-0.25rem" },
          "12%": { rotate: "5deg", translate: "0.25rem" },
          "15%": { rotate: "0deg", translate: "0rem" },
        },
      },
      textShadow: {
        xs: "1px 1px 0.25rem var(--tw-shadow-color), -1px -1px 0.25rem var(--tw-shadow-color), 1px -1px 0.25rem var(--tw-shadow-color), -1px 1px 0.25rem var(--tw-shadow-color)",
        DEFAULT: "0 0 2rem var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        { "text-shadow": (value) => ({ textShadow: value }) },
        { values: theme("textShadow") }
      );
    }),
  ],
};
