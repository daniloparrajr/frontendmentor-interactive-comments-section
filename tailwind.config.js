const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		screens: {
			sm: "23.438em",
			md: "48em",
			lg: "62em",
			xl: "90em",
		},
		fontFamily: {
			"sans": ["Rubik", ...defaultTheme.fontFamily.sans],
		},
		fontSize: {
			"base": ["1rem", "1.5rem"], // 16px
			"xs": ["0.813rem", "0.938rem"], // 13px
			"md": ["1.25rem", "1.5rem"], // 20px
			"lg": ["1.5rem", "1.75rem"], // 24px
		},
		extend: {
			colors: {
				'moderate-blue': 'hsl(238, 40%, 52%)',
				'soft-red': 'hsl(358, 79%, 66%)',
				'light-grayish-blue': 'hsl(239, 57%, 85%)',
				'pale-red': 'hsl(357, 100%, 86%)',
				'dark-blue': 'hsl(212, 24%, 26%)',
				'grayish-blue': 'hsl(211, 10%, 45%)',
				'light-gray': 'hsl(223, 19%, 93%)',
				'very-light-gray': 'hsl(228, 33%, 97%)',
			}
		},
	},
	plugins: [],
}