module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  theme: {
    extend: {
      colors: {
        blue: "#01B2FF",
      },
    },
  },

  plugins: [require("flowbite/plugin")],
};
