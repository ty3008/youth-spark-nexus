/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#050505',
                    darker: '#0A0A0A',
                    card: '#111111',
                    cardHover: '#161616',
                    gold: '#FCD12A',
                    goldHover: '#e5bc25',
                    goldLight: '#FEF08A',
                    muted: '#9CA3AF',
                }
            },
            fontFamily: {
                heading: ['Poppins', 'Plus Jakarta Sans', 'sans-serif'],
                display: ['Plus Jakarta Sans', 'Poppins', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
};
