import { theme } from '@chakra-ui/react';

export const customTheme = {
	...theme,
	colors: {
		...theme.colors,
		primary: {
			100: '#EEF0FE',
			200: '',
			300: '#B9C4F9',
			400: '',
			500: '#506BF0',
			600: '',
			700: '',
			800: '',
			900: '',
		},
		black: '#243141',
		gray: {
			100: '#F9F9FB',
			200: '#F2F2F2',
			500: '#243141',
			600: '#8A95A5',
		},
		red: {
			400: '#FB1164',
		},
		green: {
			400: '#43E28E',
			500: '#43E28E',
		},
	},
	fonts: {
		...theme.fonts,
		body: 'Raleway',
	},
};
