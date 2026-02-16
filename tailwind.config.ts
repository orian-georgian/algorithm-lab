import type { Config } from "tailwindcss";

const withOpacity = (cssVar: string) => `rgb(var(${cssVar}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        clinic: {
          white: withOpacity("--clinic-white"),
          blue: {
            50: withOpacity("--clinic-blue-50"),
            100: withOpacity("--clinic-blue-100")
          },
          teal: {
            100: withOpacity("--clinic-teal-100"),
            200: withOpacity("--clinic-teal-200"),
            600: withOpacity("--clinic-teal-600"),
            700: withOpacity("--clinic-teal-700"),
            800: withOpacity("--clinic-teal-800")
          },
          slate: {
            50: withOpacity("--clinic-slate-50"),
            600: withOpacity("--clinic-slate-600"),
            700: withOpacity("--clinic-slate-700"),
            800: withOpacity("--clinic-slate-800"),
            900: withOpacity("--clinic-slate-900")
          },
          border: withOpacity("--clinic-border"),
          page: withOpacity("--clinic-page")
        }
      },
      boxShadow: {
        soft: "0 20px 40px rgba(14, 165, 233, 0.16)",
        card: "0 10px 24px rgba(14, 165, 233, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
