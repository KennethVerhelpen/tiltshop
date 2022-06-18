import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { MovieTwoTone, TvTwoTone, SportsEsportsTwoTone, DevicesOtherTwoTone, CloseRounded } from '@mui/icons-material';


import { ThemeType, TypeType } from '../../lib/types';
import * as S from './mobile-menu.styles';
import { css, Global } from '@emotion/react';

export type MobileMenuProps= {
	types: TypeType[],
	theme: ThemeType,
	onClose: () => void;
}

export const MobileMenu = (props: MobileMenuProps) => {
	const { types, theme, onClose } = { ...props };

	return (
		<>
			<Global
				styles={css`
					body, html {
						overflow: hidden;
						position: relative;
					}
				`}
			/>
			<S.Shape className={'fixed bg-primary-900 shadow-2 layout-column'}>
				<S.Header className={'px-16 layout-row layout-align-start-center border-bottom border-primary-800 sticky'}>
					<button className={'btn-reset layout'} onClick={onClose} aria-label={'Close menu'}>
						<CloseRounded className={'text-primary-500'} style={{ fontSize: 24 }}/>
					</button>
				</S.Header>
				<main className={'overflow-y-auto py-16'}>
					<section>
						<label className={'p-16 bold h5 text-primary-100'}>Categories</label>
						<main>
							<li className={'layout-row layout-align-center-center border-bottom border-primary-800'}>
								<Link href={'/'} passHref >
									<a onClick={onClose} className={'text-primary-400 layout-column p-16 layout-align-start-stretch cursor-pointer flex'}>
										All
									</a>
								</Link>
							</li>
							{types && types
								.sort((a: TypeType, b: TypeType) => (a.id - b.id))
								.map((type: TypeType, index: number) => (
									<li key={index} className={'layout-row layout-align-start-center border-bottom border-primary-800'}>
										<Link href={`/${type.slug}`} passHref>
											<a onClick={onClose} className={'text-primary-400 layout-column layout-align-start-stretch cursor-pointer p-16 flex'}>
												<div className={'layout-row layout-align-center-center flex'}>
													{(() => {
														switch(type.slug) {
															case 'movies': return <MovieTwoTone className={'mr-8'} style={{ fontSize: 16 }}/>
															case 'tv-shows': return <TvTwoTone className={'mr-8'} style={{ fontSize: 16 }}/>
															case 'video-games': return <SportsEsportsTwoTone className={'mr-8'} style={{ fontSize: 16 }}/>
															case 'electronics': return <DevicesOtherTwoTone className={'mr-8'} style={{ fontSize: 16 }}/>
														}
													})()}
													<span className={'text-capitalize text-truncate flex'}>
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
											</a>
										</Link>
									</li>
								)
							)}
						</main>
					</section>
					<section>
						<label className={'px-16 pt-32 pb-16 bold h5 text-primary-100'}>More</label>
						<main>
							<li className={'layout-row layout-align-start-center border-bottom border-primary-800'}>
								<Link href={`/blog`}  passHref>
									<a onClick={onClose} className={'text-capitalize text-truncate text-primary-400 layout-column layout-align-start-stretch cursor-pointer p-16 flex'}>
										Blog
									</a>
								</Link>
							</li>
						</main>
					</section>
				</main>
			</S.Shape>
		</>
	);
};