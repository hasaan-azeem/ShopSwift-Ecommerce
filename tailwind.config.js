/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF4C4C",   // Main brand color (buttons, highlights)
        secondary: "#1E293B", // Deep blue-gray for text/backgrounds
        accent: "#FFD166",    // Soft yellow accent
        muted: "#64748B",     // For subtle UI text
        light: "#F8FAFC",     // Background or card surface
        dark: "#0F172A"       // Dark theme base
      },
    }
  },
  plugins: []
}
