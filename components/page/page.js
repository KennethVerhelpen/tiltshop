import Head from 'next/head';
import Image from 'next/image';
import { Nav, Footer } from '../../components';
import { BackgroundWrapper, Main } from './page.styles';

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.background = "/images/index-background.jpg";
		this.alt = "TiltShop header background";
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
					<link rel="preload" href="/fonts/FrankRuhlLibre/FrankRuhlLibre-Bold.ttf" as="font" crossOrigin=""/>
          <link rel="preload" href="/fonts/SF-Pro-Display/SF-Pro-Display-Heavy.otf" as="font" crossOrigin=""/>
					<meta name="description" content="A curated list of the best Amazon products for movie lovers, tv shows addicts and passionate gamers." />
					<link rel="icon" href="/favicon.ico" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				<Nav activePage={this.props.activePage} ref="navbar"></Nav>
				<Main className="flex pb-64">{this.props.children}</Main>
				<Footer/>
				<BackgroundWrapper className="width-100 absolute layout-column">
					<Image
						objectFit="cover"
						quality="100"
						layout="fill"
						objectPosition="center"
						priority={true}
						loading="eager"
						src={this.props.background}
						alt={this.props.alt}
						/>
				</BackgroundWrapper>
			</>
		);
	}
}

export { Page };