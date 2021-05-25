import clsx from 'clsx';
import Link from "next/link";
import { MovieTwoTone, TvTwoTone, SportsEsportsTwoTone, SearchRounded, ArrowBackTwoTone, DevicesOtherTwoTone } from '@material-ui/icons';

import { Shape, NavButton } from "./nav.styles";
import { TypeType } from '../../lib/types/types';

export const BackHistory = (slug: string) =>{
  return (
    <Link href={slug}>
			<a className="layout-row layout-align-center-center cursor-pointer">
				<ArrowBackTwoTone style={{ fontSize: 16 }} className="text-secondary-100 mr-8" />
				<span className="small hide-xs text-secondary-100">Go back</span>
				<span className="mx-8 h5 hide-xs text-secondary-700">/</span>
			</a>
		</Link>
  )
}

export type NavProps= {
	menu: boolean,
	history: string,
	activePage: string,
	types: TypeType[];
}

export const Nav = (props: NavProps) => {
	const { types, menu, history, activePage } = { ...props };

	return (
		<Shape className="layout-column layout-align-start-center">
			<div className="container-lg layout-align-stretch-center layout-row flex">
				<div className="flex hide-gt-xs layout-row layout-align-start-center">
					{ history && BackHistory(history) }
				</div>
				<div className="layout-row layout-align-start-center layout-align-xs-center-center flex">
					<div className="hide-xs">
						{ history && !menu && BackHistory(history) }	
					</div>
					<Link href={"/"}>
						<a className="text-secondary-100 bold h6 serif">tilt.</a>
					</Link>
				</div>
				<div className="flex layout layout-align-end-center">
					<Link href={'/blog'}>
						<a className="text-secondary-100 px-16 small cursor-pointer">Blog</a>
					</Link>
					<Link href={'/search'}>
						<a aria-label="Browse" title="Browse" className="layout text-secondary-100 layout-align-center-center p-4 rounded cursor-pointer">
							<SearchRounded style={{ fontSize: 20 }}/>
						</a>
					</Link>
				</div>
			</div>
			{ menu ?
				<div className="border-top border-secondary-700 layout-row layout-align-center-center flex-none hide-xs width-100">
					<ul className="small flex-noshrink layout-row layout-align-center-stretch p-0 m-0 list-reset">
						<li className="layout-row layout-align-center-center">
							<Link href={"/"}>
								<NavButton className={clsx(activePage === undefined && "active bold text-secondary-100", "text-secondary-500 layout-column layout-align-start-stretch cursor-pointer")}>
									<div className="layout-row layout-align-center-center px-16 flex">
										<span>All</span>
									</div>
								</NavButton>
							</Link>
						</li>
						{types && types.map((type: TypeType, index: number) => (
							<li key={index} className="layout-row layout-align-center-center">
								<Link href={`/${type.slug}`}>
									<NavButton className={clsx(activePage === type.slug && "active bold text-secondary-100", "text-secondary-500 layout-column layout-align-start-stretch cursor-pointer")}>
										<div className="layout-row layout-align-center-center px-16 flex">
											{(() => {
												switch(type.slug) {
													case 'movies': return <MovieTwoTone className="m-8" style={{ fontSize: 16 }}/>
													case 'tv-shows': return <TvTwoTone className="m-8" style={{ fontSize: 16 }}/>
													case 'video-games': return <SportsEsportsTwoTone className="m-8" style={{ fontSize: 16 }}/>
													case 'electronics': return <DevicesOtherTwoTone className="m-8" style={{ fontSize: 16 }}/>
												}
											})()}
											<span className="text-capitalize text-truncate">
												{(() => {
													switch(type.slug) {
														case 'movies': return "movies"
														case 'tv-shows': return "tv shows"
														case 'video-games': return "video games"
														case 'electronics': return "electronics"
													}
												})()}
											</span>
										</div>
									</NavButton>
								</Link>
							</li>
						))}
					</ul>
				</div>
				: null 	
			}
		</Shape>
	);
};