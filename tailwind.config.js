export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#0b6b3a',
          dark: '#075029',
          mid: '#128a4c',
          tint: '#e8f3ec',
          tint2: '#f3f9f5',
        },
        navy: {
          DEFAULT: '#0f2942',
          soft: '#1f3f5c',
        },
        ink: {
          500: '#64748b',
          400: '#94a3b8',
        },
        line: {
          DEFAULT: '#e7e9ee',
          soft: '#eef0f4',
        },
        info: {
          DEFAULT: '#2563eb',
          tint: '#e8effd',
        },
        warn: {
          DEFAULT: '#b45309',
          tint: '#fdf2e3',
        },
      },
      borderRadius: {
        card: '8px',
        chip: '6px',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(15, 41, 66, 0.04)',
        pop: '0 8px 24px -8px rgba(15, 41, 66, 0.16)',
      },
      maxWidth: {
        shell: '1480px',
      },
      fontSize: {
        '2xs': ['11px', '15px'],
      },
    },
  },
}
