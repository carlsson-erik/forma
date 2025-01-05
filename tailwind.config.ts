import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: '#2094f3',
				background: '#F8FBFC',
				inputBackground: '#E8EDF5'
			}
		}
	},

	plugins: []
} satisfies Config;
