import { ReactNode, useContext } from 'react';
import Image from 'next/image';
import Head from 'next/head';

import { Nav, Footer } from '../../components';
import { TypeType } from '../../lib/types';
import * as S from './page.styles';
import clsx from 'clsx';
import { ThemeContext } from '../../pages/_app';

export type PageProps = {
	activePage?: string,
	alt?: string,
	bgImageUrl?: string
	children?: ReactNode,
	description?: string,
	footer?: boolean;
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
		children,
		description,
		footer,
		history,
		menu,
		nav,
		ogImageUrl,
		title,
		types,
	} = {...defaultProps, ...props};

	const { theme, switchTheme } = useContext(ThemeContext);

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
			{nav ? <Nav types={types} history={history} menu={menu} activePage={activePage} switchTheme={switchTheme}/> : null}
			<S.Main className={clsx(theme === 'dark' ? 'bg-primary-900' : 'bg-neutral-100', 'flex layout-column layout-align-start-center')}>{children}</S.Main>
			{footer ? <Footer/> : null}
		</>
	);
}

const defaultProps = {
	activePage: undefined,
	alt: 'Best items for cinema, tv & gaming lovers',
	description: `Discover the best hand-picked items of ${new Date().getFullYear()} sorted out just for cinema, tv shows and video games lovers.`,
	footer: true,
	image: 'https://tiltshop.co/_next/image?url=%2Fimages%2Fmeta%2Fdefault-meta.jpg&w=1200&q=100', 
	menu: true,
	nav: true,
	theme: 'light',
	title: `Best items for cinema, tv & gaming lovers in ${new Date().getFullYear()}`,
}