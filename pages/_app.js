import "../styles/index.scss";
import { HistoryProvider } from "../contexts/use-history";

export default function App({ Component, pageProps }) {
	return (
		<HistoryProvider>
			<Component {...pageProps} />
		</HistoryProvider>
	)
}
