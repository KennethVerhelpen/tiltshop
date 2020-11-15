import Head from 'next/head';
import { Nav, Footer } from '../../components';

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			links: Object,
			children: props.node,
			activePage: String
		};
	}

	render() {
		return (
			<>
				<Head>
					<title>TiltShop</title>
					<link rel="icon" href="/favicon.ico" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				<Nav activePage={this.props.activePage} ref="navbar"></Nav>
				<main className="flex pb-64">{this.props.children}</main>
				<Footer/>
			</>
		);
	}
}

export {Page};