import Head from 'next/head';
import { Nav, Footer } from '../../components';
import { BackgroundWrapper, Main, Video } from './page.styles';

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.video = String,
		this.image = String,
		this.description = String,
		this.alt = String,
		this.title = String,
		this.children = React.ReactNode,
		this.state = {
			activePage: String,
		};
	}

	render() {
		return (
			<>
				<Head>
					<title>{this.props.title}</title>
					<meta name="keywords" content="Cinema, Movies, Tv shows, Video games" />
					<meta name="description" content={this.props.description} />
					<meta property="og:title" content={this.props.title} />
					<meta property="og:description" content={this.props.description} />
					<meta property="og:image" content={this.props.image} />
					<meta property="og:url" content="http://tiltshop.co" />
					<meta name="twitter:title" content={this.props.description} />
					<meta name="twitter:card" content="summary_large_image" />
					<link rel="icon" href="/favicon.ico" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				<Nav activePage={this.state.activePage} ref="navbar"></Nav>
				<Main className="flex">{this.props.children}</Main>
				<Footer/>
				<BackgroundWrapper className="width-100 absolute layout-column">
					<Video className="width-100" muted autoPlay="autoplay" loop="loop" width="1440" height="768">
  					<source src={this.props.video} type="video/mp4" /> 
					</Video>
				</BackgroundWrapper>
			</>
		);
	}
}

Page.defaultProps = {
	video:"/videos/noise.mp4",
	image:"https://tiltshop.co/_next/image?url=%2Fimages%2Fmeta%2Fdefault-meta.jpg&w=1200&q=100",
	description:"Discover the best hand-picked items from Amazon's catalogue sorted out just for cinema, tv shows and video games lovers.",
	alt:"The best items for cinema, tv & gaming lovers.",
	title:"TiltShop - The best items for cinema, tv & gaming lovers",
}

export { Page };