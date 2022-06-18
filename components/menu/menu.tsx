import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { MovieTwoTone, TvTwoTone, SportsEsportsTwoTone, DevicesOtherTwoTone, CloseRounded } from '@mui/icons-material';


import { ThemeType, TypeType } from '../../lib/types';
import * as S from './menu.styles';

export type MenuProps= {
	types: TypeType[],
	theme: ThemeType,
	activePage: TypeType['slug'],
}

export const Menu = (props: MenuProps) => {
	const { types, theme, activePage } = { ...props };

	return (
		<div className={'border-top border-bottom border-primary-800 layout-row layout-align-center-center flex-none hide-xs width-100'}>
			<ul className={'small flex-noshrink layout-row layout-align-center-stretch p-0 m-0 list-reset'}>
				<li className={'layout-row layout-align-center-center'}>
					<Link href={'/'} passHref>
						<S.NavButton className={clsx(activePage === undefined && 'active bold text-primary-100', 'text-primary-400 layout-column layout-align-start-stretch cursor-pointer')}>
							<span className={'layout-row layout-align-center-center px-16 flex'}>
								<span>All</span>
							</span>
						</S.NavButton>
					</Link>
				</li>
				{types && types
					.sort((a: TypeType, b: TypeType) => (a.id - b.id))
					.map((type: TypeType, index: number) => (
						<li key={index} className={'layout-row layout-align-center-center'}>
							<Link href={`/${type.slug}`} passHref>
								<S.NavButton className={clsx(activePage === type.slug && 'active bold text-primary-100', 'text-primary-400 layout-column layout-align-start-stretch cursor-pointer')}>
									<div className={'layout-row layout-align-center-center px-16 flex'}>
										{(() => {
											switch(type.slug) {
												case 'movies': return <MovieTwoTone className={'m-8'} style={{ fontSize: 16 }}/>
												case 'tv-shows': return <TvTwoTone className={'m-8'} style={{ fontSize: 16 }}/>
												case 'video-games': return <SportsEsportsTwoTone className={'m-8'} style={{ fontSize: 16 }}/>
												case 'electronics': return <DevicesOtherTwoTone className={'m-8'} style={{ fontSize: 16 }}/>
											}
										})()}
										<span className={'text-capitalize text-truncate'}>
											{(() => {
												switch(type.slug) {
													case 'movies': return 'movies'
													case 'tv-shows': return 'tv shows'
													case 'video-games': return 'video games'
													case 'electronics': return 'electronics'
												}
											})()}
										</span>
									</div>
								</S.NavButton>
							</Link>
						</li>
					)
				)}
			</ul>
		</div>
	);
};