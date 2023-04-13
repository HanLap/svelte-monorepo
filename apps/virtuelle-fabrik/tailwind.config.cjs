const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
	},

	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	darkMode: 'class',
};

module.exports = config;
