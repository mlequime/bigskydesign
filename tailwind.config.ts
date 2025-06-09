import plugin from 'tailwindcss/plugin'
import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

export default {
	content: [
		'./src/{app,ui}/**/*.{ts,tsx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#f6f8f7',
					100: '#e8eeea',
					200: '#d1ddd5',
					300: '#aec5b7',
					400: '#84a693',
					500: '#658875',
					600: '#4f6d5e',
					700: '#42594e',
					800: '#374841',
					900: '#1f2e27', // Original primary color
					DEFAULT: '#1f2e27',
				},
				secondary: {
					50: '#f6f9fa',
					100: '#edf2f4',
					200: '#dde8ea',
					300: '#c7d8db',
					400: '#adc1c7',
					500: '#8fa8af',
					600: '#5a7378', // Original secondary color
					700: '#4d6267',
					800: '#435257',
					900: '#3b474b',
					DEFAULT: '#5a7378',
				},
				background: '#CBE4F8',
				ink: '#1d1d1f',
				canvas: '#fff',
				accent: '#1d1d1f',
			},
			maxHeight: {
				fold: 'calc(100svh - var(--header-height))',
			},
		},

		lh: {
			DEFAULT: '1lh',
			2: '2lh',
			3: '3lh',
		},
	},
	plugins: [
		plugin(function ({ addVariant, matchUtilities, theme }) {
			addVariant('header-open', 'body:has(#header-open:checked) &')
			addVariant('header-closed', 'body:has(#header-open:not(:checked)) &')

			matchUtilities(
				{
					skeleton: (value) => ({
						height: value,
						backgroundColor: theme('colors.neutral.50'),
					}),
				},
				{
					values: theme('lh'),
				},
			)
		}),
		nextui({
			// themes: {
			// 	default: {
			// 		extend: 'light',
			// 		layout: {
			// 			radius: {
			// 				small: '0',
			// 				medium: '0',
			// 				large: '0',
			// 			},
			// 		},
			// 	},
			// },
		}),
	],
	safelist: [{ pattern: /action.*/ }, 'ghost'],
	darkMode: 'class',
} satisfies Config
