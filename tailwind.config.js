/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: { 
                'acumin': ['acumin-pro','acumin-variable'],
            },
            colors: {
                'primary-green': '#4ab969',
                'primary-blue': '#00a7d5',
                'primary-yellow': '#ffcb05',
                'primary-orange': '#ff8003',
                'primary-violet': '#a2a2ff',
                'primary-dark-green': '#004029',
                'primary-acc-green': '#42a85f',
                'primary-acc-blue': '#009fc9',
                'primary-acc-orange': '#f76902',
                'primary-acc-violet': '#8d73de',
                'primary-acc-dark-green': '#173a21',
                'secondary-green': '#95e6ac',
                'secondary-blue': '#a1dbe4',
                'secondary-yellow': '#ffea95',
                'secondary-orange': '#fcc5a1',
                'secondary-violet': '#ececff',
                'neutral-grey': '#676767',
                'blue-label':'#00ADF2',
                'cian-label':"#5CCFE1",
                'green-edition':'#00D6AB',
                'red-edition':'#FD6B62',
                'blue-edition':'#009ECA',
                'yellow-edition':'#FFC64D',
                'grey-edition':'#D9D9D9',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
                'gradient-custom': 'linear-gradient(90deg, rgba(255, 203, 5, 1) 0%, rgba(74, 185, 105, 1) 50%, rgba(0, 159, 201, 1) 100%)',
            },
            screens: {
                'xsm': '450px',
                'xxl':'1328px'},
            padding: {
                '7p': '7.5%',
                '10p': '10%',
            },
        },
    },
    plugins: [],
}
