/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.svelte'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: ['light']
	},
	plugins: [require('daisyui')]
};
