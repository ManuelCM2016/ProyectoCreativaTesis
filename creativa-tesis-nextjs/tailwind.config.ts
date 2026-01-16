import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'primary-blue': '#1A73E8',
                'secondary-blue': '#96C2E9',
                'navy-text': '#1E3A5F',
                'background-light': '#FFFFFF',
                'background-dark': '#101a22',
                'light-grey-bg': '#F8F9FA',
            },
            fontFamily: {
                heading: ['var(--font-heading)', 'serif'],
                body: ['var(--font-body)', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '8px',
                lg: '12px',
                xl: '16px',
                full: '9999px',
            },
            boxShadow: {
                subtle: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)',
                md: '0 6px 10px rgba(0, 0, 0, 0.08), 0 2px 5px rgba(0, 0, 0, 0.05)',
                lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.07)',
                xl: '0 20px 25px rgba(0, 0, 0, 0.15), 0 8px 10px rgba(0, 0, 0, 0.08)',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}

export default config
