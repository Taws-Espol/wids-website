/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'acumin': ['"Acumin Variable"', 'sans-serif'],
            },
            colors: {
                'custom-yellow': '#ffcb05',
                'custom-green': '#4ab969',
                'custom-blue': '#009fc9',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
                'gradient-custom': 'linear-gradient(90deg, rgba(255, 203, 5, 1) 0%, rgba(74, 185, 105, 1) 50%, rgba(0, 159, 201, 1) 100%)',
            },
        },
    },
    plugins: [],
}