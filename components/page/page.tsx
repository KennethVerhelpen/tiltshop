import { ReactNode } from 'react';
import Image from 'next/image';
import Head from 'next/head';

import { Nav, Footer } from '../../components';
import { TypeType } from '../../lib/types';
import * as S from './page.styles';
import clsx from 'clsx';

export type PageProps = {
	activePage?: string,
	alt?: string,
	bgImageUrl?: string
	children?: ReactNode,
	description?: string,
	history?: string,
	menu?: boolean,
	nav? : boolean;
	ogImageUrl?: string,
	theme?: 'dark' | 'light';
	title?: string,
	types?: TypeType[],
	video?: string,
}

export const Page = (props: PageProps) => {
	const {
		activePage,
		alt,
		bgImageUrl,
		children,
		description,
		history,
		menu,
		nav,
		ogImageUrl,
		theme,
		title,
		types,
		video,
	} = {...defaultProps, ...props};

	return (
		<>
			<Head>
				<meta charSet={'UTF-8'} />
				<meta name={'viewport'} content={'initial-scale=1.0, width=device-width'} />
				<title>Tiltshop: {title}</title>
				<meta name={'keywords'} content={'Cinema, Movies, Tv shows, Video games'} />
				<meta name={'description'} content={description} />
				<meta property={'og:title'} content={title} />
				<meta property={'og:description'} content={description} />
				<meta property={'og:image'} content={ogImageUrl} />
				<meta property={'og:url'} content={'http://tiltshop.co'} />
				<meta name={'twitter:title'} content={description} />
				<meta name={'twitter:card'} content={'summary_large_image'} />
				<link rel={'icon'} href={'/favicon.ico'} />
				<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone&display=block" rel="preconnect" />
			</Head>
			{nav ? <Nav types={types} history={history} menu={menu} activePage={activePage}/> : null}
			<S.Main nav={nav} menu={menu} className={clsx(theme === 'dark' ? 'dark' : null, 'flex layout-column layout-align-start-center')}>{children}</S.Main>
			<Footer/>
			{/* <BackgroundWrapper className={'width-100 absolute layout-column'}>
				<div className={'hide-gt-xs width-100 height-100'}>
					<Image
						src={'/images/backgrounds/mobile-background.jpg'}
						layout={'fill'}
						quality={'100'}
						objectFit={'cover'}
						objectPosition={'center'}
						priority={true}
						loading={'eager'}
						alt={alt}
					/>
				</div>
				{ bgImageUrl
					?	<img src={bgImageUrl} alt={alt}/>
					: <video
							className={'width-100 hide-xs'}
							style={{ height : 'auto' }}
							playsInline={true} 
							muted
							autoPlay={true}
							loop={true}
							width={'1440'}
							height={'768'}
						>
							<source src={video} type={'video/mp4'} />
						</video>
					}
			</BackgroundWrapper> */}
		</>
	);
}

const defaultProps = {
	menu: true,
	nav: true,
	theme: 'light',
	// video: '/videos/noise.mp4',
	image: 'https://tiltshop.co/_next/image?url=%2Fimages%2Fmeta%2Fdefault-meta.jpg&w=1200&q=100', 
	description: `Discover the best hand-picked items of ${new Date().getFullYear()} sorted out just for cinema, tv shows and video games lovers.`,
	alt: 'Best items for cinema, tv & gaming lovers',
	title: `Best items for cinema, tv & gaming lovers in ${new Date().getFullYear()}`,
	activePage: undefined
}