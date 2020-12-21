import Head from 'next/head';
import { Nav, Footer } from '../../components';
import Image from "next/image";
import { BackgroundWrapper, Main, Video } from './page.styles';

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.video = String,
		this.image = String,
		this.description = String,
		this.alt = String,
		this.title = String,
		this.menu = Boolean,
		this.children = React.ReactNode,
		this.activePage = String
	}

	render() {
		return (
			<>
				<Head>
					<meta charset="UTF-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<title>{this.props.title} - 2021</title>
					<meta name="keywords" content="Cinema, Movies, Tv shows, Video games" />
					<meta name="description" content={this.props.description} />
					<meta property="og:title" content={this.props.title} />
					<meta property="og:description" content={this.props.description} />
					<meta property="og:image" content={this.props.image} />
					<meta property="og:url" content="http://tiltshop.co" />
					<meta name="twitter:title" content={this.props.description} />
					<meta name="twitter:card" content="summary_large_image" />
				</Head>
				<Nav menu={this.props.menu} activePage={this.props.activePage} ref="navbar"></Nav>
				<Main className="flex">{this.props.children}</Main>
				<Footer/>
				<BackgroundWrapper className="width-100 absolute layout-column">
					<div className="hide-gt-xs width-100 height-100">
						<Image
							src="/images/mobile-background.jpg"
							layout="fill"
							quality="100"
							objectFit="cover"
							objectPosition="center"
							priority={true}
							loading={"eager"}
							alt={this.props.alt}
						/>
					</div>
					<video className="width-100 hide-xs" style={{ height : 'auto' }} playsInline={true} muted autoPlay="autoplay" loop="loop" width="1440" height="768">
  					<source src={this.props.video} type="video/mp4" />
					</video>
				</BackgroundWrapper>
			</>
		);
	}
}

Page.defaultProps = {
	menu: true,
	video: "/videos/noise.mp4",
	image: "https://tiltshop.co/_next/image?url=%2Fimages%2Fmeta%2Fdefault-meta.jpg&w=1200&q=100",
	description: "Discover the best hand-picked items from 2021 Amazon's catalogue sorted out just for cinema, tv shows and video games lovers.",
	alt: "Tiltshop - The best items for cinema, tv & gaming lovers in 2021.",
	title: "TiltShop - Best items for cinema, tv & gaming lovers in 2021",
	activePage: undefined
}

export { Page };