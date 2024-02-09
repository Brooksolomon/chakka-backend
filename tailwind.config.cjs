/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.svelte'],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ['Montserrat']
			}
		}
	},
	daisyui: {
		themes: ['light']
	},
	plugins: [require('daisyui')]
};
