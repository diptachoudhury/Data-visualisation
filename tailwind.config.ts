// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {

  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
   theme: {
    extend: {
      width: {
        'sd': '350px',
        'ld': '650px', 
      }
    },
  },
  plugins: [],
};

export default config;
