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
		this.allowBack = Boolean,
		this.children = React.ReactNode,
		this.activePage = String,
		this.history = String,
		this.types = Array
	}

	render() {
		const { types, video, image, description, alt, title, menu, allowBack, children, activePage, history } = this.props;

		return (
			<>
				<Head>
					<meta charSet="UTF-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<title>Tiltshop: {title}</title>
					<meta name="keywords" content="Cinema, Movies, Tv shows, Video games" />
					<meta name="description" content={description} />
					<meta property="og:title" content={title} />
					<meta property="og:description" content={description} />
					<meta property="og:image" content={image} />
					<meta property="og:url" content="http://tiltshop.co" />
					<meta name="twitter:title" content={description} />
					<meta name="twitter:card" content="summary_large_image" />
				</Head>
				<Nav types={types} history={history} menu={menu} allowBack={allowBack} activePage={activePage} ref="navbar"></Nav>
				<Main className="flex pt-56">{children}</Main>
				<Footer/>
				<BackgroundWrapper className="width-100 absolute layout-column">
					<div className="hide-gt-xs width-100 height-100">
						<Image
							src="/images/backgrounds/mobile-background.jpg"
							layout="fill"
							quality="100"
							objectFit="cover"
							objectPosition="center"
							priority={true}
							loading={"eager"}
							alt={alt}
						/>
					</div>
					<video className="width-100 hide-xs" style={{ height : 'auto' }} playsInline={true} muted autoPlay="autoplay" loop="loop" width="1440" height="768">
  					<source src={video} type="video/mp4" />
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
	description: `Discover the best hand-picked items of ${new Date().getFullYear()} sorted out just for cinema, tv shows and video games lovers.`,
	alt: "Best items for cinema, tv & gaming lovers",
	title: `Best items for cinema, tv & gaming lovers in ${new Date().getFullYear()}`,
	activePage: undefined
}

export { Page };