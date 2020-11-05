import Head from 'next/head';
import { Nav, Footer } from '../../components';

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			media: Object,
			onClick: Function,
			children: props.node,
			activeMedia: Number
		};
	}

	render() {
		return (
			<>
				<Head>
					<title>Tilt Shop</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Nav activeLink={this.props.activeMedia} onClick={this.props.onClick} links={this.props.media} ref="navbar"></Nav>
				<main className="flex pb-64">{this.props.children}</main>
				<Footer/>
			</>
		);
	}
}

export {Page};