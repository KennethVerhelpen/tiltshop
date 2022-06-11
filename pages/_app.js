import React, { useState, useEffect } from "react";
import "../styles/index.scss";
import { HistoryProvider } from "../contexts/use-history";
import { css, Global } from "@emotion/react";
import { COLORS } from "../styles/design-system/variables";

export const ThemeContext = React.createContext();

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

	useEffect(() => {
		console.log("LOCAL", localStorage.getItem('theme'));
		if (localStorage.getItem('theme') === null) {
			localStorage.setItem('theme', JSON.stringify('dark'));
		} else {
			setTheme(localStorage.getItem('theme').replace(/['"]+/g, ''));
		}
	}, []);

	return (
		<>
			<Global
				styles={css`
					html,
					body {
						background: ${theme === 'dark' ? COLORS.PRIMARY_900 : COLORS.NEUTRAL_100};
					}
				`}
			/>
			<HistoryProvider>
				<ThemeContext.Provider value={{ switchTheme, theme }}>
					<Component {...pageProps} />
				</ThemeContext.Provider>
			</HistoryProvider>
		</>
	)
}
