/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                ink: '#0A0A0A',
                panel: '#161616',
                fg: '#F5F5F5',
                muted: '#A3A3A3',
                gold: { DEFAULT: '#FCD12A', dark: '#E5BC25' },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
