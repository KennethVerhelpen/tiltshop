import Head from 'next/head';
import { Nav, Footer } from '../../components';
import { BackgroundWrapper, Main } from './page.styles';

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.video = "/videos/noise.mp4";
		this.title = "TiltShop - The best items for cinema, tv & gaming lovers"
		this.image = "https://tiltshop.co/_next/image?url=%2Fimages%2Fmeta%2Fdefault-meta.jpg&w=3840&q=100";
		this.description = "Discover the best hand-picked items from Amazon's catalogue sorted out just for cinema, tv shows and video games lovers."
		this.alt = "The best items for cinema, tv & gaming lovers.";
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
					<title>{this.title}</title>

					<meta name="keywords" content="Cinema, Movies, Tv shows"></meta>
					<meta name="description" content={this.description}/>

					<meta property="og:title" content={this.title} key="title"/>
					<meta property="og:description" content={this.description}/>
					<meta property="og:image" content={this.image}/>
					<meta property="og:url" content="http://tiltshop.co"/>

					<meta name="twitter:title" content={this.description}/>
					<meta name="twitter:card" content="summary_large_image"/>

					<link rel="icon" href="/favicon.ico" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				<Nav activePage={this.props.activePage} ref="navbar"></Nav>
				<Main className="flex pb-64">{this.props.children}</Main>
				<Footer/>
				<BackgroundWrapper className="width-100 absolute layout-column">
					<video muted autoPlay="autoplay" loop="loop" width="1440" height="768">
  					<source src={this.video} type="video/mp4" /> 
					</video>
				</BackgroundWrapper>
			</>
		);
	}
}

export { Page };