import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { MovieTwoTone, TvTwoTone, SportsEsportsTwoTone, SearchRounded, ArrowBackTwoTone, DevicesOtherTwoTone, DarkModeTwoTone, LightModeTwoTone, MenuRounded } from '@mui/icons-material';

import { MobileMenu } from '../../components';
import { ThemeType, TypeType } from '../../lib/types';
import { Logo } from '../logo/logo';
import * as S from './nav.styles';
import { Menu } from '../menu/menu';

export const BackHistory = (slug: string) =>{
  return (
		<div className="hide-xs layout-align-center-center layout-column">
			<Link href={slug}>
				<a className={'layout-row layout-align-center-center cursor-pointer'}>
					<ArrowBackTwoTone style={{ fontSize: 16 }} className={'text-primary-100 mr-8'} />
					<span className={'small hide-xs text-primary-100'}>Go back</span>
					<span className={'mx-8 h5 hide-xs text-primary-500'}>/</span>
				</a>
			</Link>
		</div>
  )
}

export type NavProps= {
	menu: boolean,
	history: string,
	activePage: TypeType['slug'],
	types: TypeType[];
	theme: ThemeType;
	switchTheme?: () => void;
}

export const Nav = (props: NavProps) => {
	const { types, theme, menu, history, activePage, switchTheme } = { ...props };

	const [mobileMenu, setMobileMenu] = useState(false);

	return (
		<S.Shape className={'layout-column layout-align-start-center bg-primary-900'}>
			<div className={'border-bottom border-primary-800 width-100 layout-row'}>
				<div className={'container-lg layout-align-stretch-center layout-row flex'}>
					<div className={'list-reset layout-column layout-align-center-start flex hide show-xs'}>
						<button className={'btn-reset'} onClick={() => setMobileMenu(true)} aria-label={'Menu'}>
							<MenuRounded className={'text-primary-100'}/>
						</button>
					</div>
					{ history && !menu && BackHistory(history) }
					<div className="layout-column layout-align-center-center">
						<Link href={'/'}>
							<a className={'text-primary-100 bold h6 cursive'}>
								<Logo theme={'dark'} className={'h2'}/>
							</a>
						</Link>
					</div>
					<ul className={'list-reset flex layout layout-align-end-center'}>
						<li className="hide-xs">
							<Link href={'/blog'}>
								<a className='text-primary-100 px-16 small cursor-pointer'>Blog</a>
							</Link>
						</li>
						<li className={'hide-xs'}>
							<Link href={'/search'}>
								<a aria-label={'Search'} title={'Search'} className={'layout text-primary-100 layout-align-center-center p-4 rounded cursor-pointer'}>
									<SearchRounded style={{ fontSize: 20 }}/>
								</a>
							</Link>
						</li>
						<li>
							<button aria-label={'Switch theme'} className={'btn-reset layout-align-center-center layout-column cursor-pointer p-4'} onClick={switchTheme}>
								{ theme === 'dark' ? <DarkModeTwoTone className={'text-primary-100'} style={{ fontSize: 20 }}/> :  
								<LightModeTwoTone className={'text-primary-100'} style={{ fontSize: 20 }}/>}
							</button>
						</li>
					</ul>
				</div>
			</div>
			{ menu &&
				<Menu activePage={activePage} types={types} theme={theme}/>
			}
			{mobileMenu && 
				<MobileMenu types={types} theme={theme} onClose={() => setMobileMenu(false)}/>
			}
		</S.Shape>
	);
};