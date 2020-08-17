import Head from 'next/head';
import Nav from '../nav/nav';
import Footer from "../footer/footer";

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			children: props.node,
		};
	}

	render() {
		const routes = [
			{ label: "Products", href: "/" },
			{ label: "Sales", href: "/sales" },
			{ label: "About", href: "/about" },
			{ label: "Contact", href: "/contact" }
		];

		return (
			<>
				<Head>
					<title>Tilt Shop</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Nav links={routes} ref="navbar"></Nav>
				<main className="flex pb-64">{this.props.children}</main>
				<Footer links={routes} />
			</>
		);
	}
}

export default Modal;