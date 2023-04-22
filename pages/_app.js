import { useState, useEffect, createContext } from "react";
import "../styles/index.scss";
// import { HistoryProvider } from "../contexts/use-history";
import { css, Global } from "@emotion/react";
import { COLORS } from "../styles/design-system/variables";
import { Analytics } from '@vercel/analytics/react';

export const ThemeContext = createContext();

export default function App({ Component, pageProps }) {
	const [theme, setTheme] = useState('dark');

	const switchTheme = () => {
		if (theme === 'dark') {
			localStorage.setItem('theme', JSON.stringify('light'));
			setTheme(localStorage.getItem('theme').replace(/['"]+/g, ''));
		} else {
			localStorage.setItem('theme', JSON.stringify('dark'));
			setTheme(localStorage.getItem('theme').replace(/['"]+/g, ''));
		}
	}

	const handleTheme = (mode) => {
		setTheme(mode);
		localStorage.setItem('theme', JSON.stringify(mode));
	}

	useEffect(() => {
		const darkColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (mode) => handleTheme(mode.matches ? 'dark' : 'light'));
		if (localStorage.getItem('theme') !== null) {
			handleTheme(localStorage.getItem('theme').replace(/['"]+/g, ''));
		} else {
			handleTheme(darkColorScheme.matches ? 'dark' : 'light');
		}
		return () => {
			window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change');
		}
	}, [])

	return (
		<>
			<ThemeContext.Provider value={{ switchTheme, theme }}>
				<Component {...pageProps} />
			</ThemeContext.Provider>
			<Analytics />
		</>
	)
}
