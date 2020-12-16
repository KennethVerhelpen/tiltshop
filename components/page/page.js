import Head from 'next/head';
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
					<meta name="description" content="Discover the best hand-picked items from Amazon's catalogue sorted out just for cinema, tv shows and video games lovers." />
					<meta property="og:title" content="TiltShop - The best items for cinema, tv & gaming lovers." key="title"/>
					<meta property="og:description" content="Discover the best hand-picked items from Amazon's catalogue selected for cinema, tv shows and video games lovers."/>
					<meta property="og:image" content="/images/meta/default-meta.jpg"/>
					<meta property="og:url" content="http://tiltshop.co"/>
					<meta name="twitter:card" content="summary_large_image"/>
					<meta name="twitter:title" content="A curated list of the best Amazon products for movie lovers, tv shows addicts and passionate gamers."></meta>
					<link rel="icon" href="/favicon.ico" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				<Nav activePage={this.props.activePage} ref="navbar"></Nav>
				<Main className="flex pb-64">{this.props.children}</Main>
				<Footer/>
				<BackgroundWrapper className="width-100 absolute layout-column">
					<video muted autoPlay="autoplay" loop="loop" width="1440" height="768">
  					<source src="/videos/noise.mp4" type="video/mp4" /> 
					</video>
				</BackgroundWrapper>
			</>
		);
	}
}

export { Page };