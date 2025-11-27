/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte,js,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				fire: {
					DEFAULT: '#e84c2b',
					50: '#fef3f2',
					100: '#fee4e2',
					200: '#fecdca',
					300: '#fca8a4',
					400: '#f87c6f',
					500: '#e84c2b',
					600: '#d53a1f',
					700: '#b32d17',
					800: '#942817',
					900: '#7a2619',
				},
			},
			animation: {
				'slide-in': 'slideIn 0.3s ease-out',
				'fade-in': 'fadeIn 0.2s ease-out',
			},
			keyframes: {
				slideIn: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
			},
		},
	},
	plugins: [],
};
