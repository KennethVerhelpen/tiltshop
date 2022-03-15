import React, { useState } from "react";
import "../styles/index.scss";
import { HistoryProvider } from "../contexts/use-history";

export const ThemeContext = React.createContext();

export default function App({ Component, pageProps }) {
	const [theme, setTheme] = useState('light');

	const switchTheme = () => {
		if (theme === 'dark') {
			setTheme('light');
		} else { setTheme('dark'); }
	}
	return (
		<HistoryProvider>
			<ThemeContext.Provider value={{ switchTheme, theme }}>
				<Component {...pageProps} />
			</ThemeContext.Provider>
		</HistoryProvider>
	)
}
