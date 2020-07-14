import { useEffect, useState } from 'react';

export const useDarkMode = () => {
	const [theme, setTheme] = useState('light');

	const setMode = (mode) => {
		window.localStorage.setItem('theme', mode);
		setTheme(mode);
	};

	const themeToggler = () => {
		theme === 'dark' ? setMode('light') : setMode('dark');
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem('theme');
		localTheme && setTheme(localTheme);
	}, []);
	return [theme, themeToggler];
};
