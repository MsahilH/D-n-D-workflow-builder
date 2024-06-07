module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx,css}'],
	darkMode: false,
	theme: {
		extend: {
			colors: {
				primary: '#1a192b',
				secondary: '#4C497E',
				tertiary: '#4C497E',
				background: '#222138',
				'border-color': '#333154',
				'font-color': '#f8f8f2',
				'input-bg': 'rgba(255, 255, 255, 0.08)',
				'workflow-color': '#6866ac',
			},
			transitionProperty: {
				'hover-transition': 'transition duration-300 ease-in-out',
			},
			fontFamily: {
				sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
