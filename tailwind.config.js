module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "85v": "85vh",
        "90v": "90vh",
        "100v": "100vh",
      },
      minHeight: {
        "5v": "5vh",
        "85v": "85vh",
      },
      colors: {
        light: "#FFFFFF",
        twilight: "#708090",
        night: "#131618",
        honouring: "#ADFB2E",
        breaking: "#FDC0CB",
        celestial: "#34BFFF",
        sun: "#FB8C01",
        star: "#E99802",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
