import clsx from 'clsx';
import { Shape, NavButton, Browse, Logo, BackButton, Blog } from "./nav.styles";
import mediaSet from "../../lib/media";
import Link from "next/link";
import { MovieTwoTone, TvTwoTone, SportsEsportsTwoTone, SearchRounded, ArrowBackTwoTone, DevicesOtherTwoTone } from '@material-ui/icons';
import { useRouter } from 'next/router'

function BackHistory() {
  const router = useRouter();
  return (
    <BackButton onClick={() => router.back()} className="cursor-pointer layout-row layout-align-start-center">
			<ArrowBackTwoTone style={{ fontSize: 16 }} className="mr-8" />
			<span className="small hide-xs">Go back</span>
			<span className="mx-8 h5 hide-xs" style={{ opacity: 0.2 }}>/</span>
		</BackButton>
  )
}

class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.allowBack = Boolean,
		this.activePage = String,
		this.menu = Boolean
	}

	render = () => {
		return (
			<Shape className="layout-column layout-align-start-center">
				<div className="container-lg layout-align-stretch-center layout-row flex">
					<div className="flex hide-gt-xs layout-row layout-align-start-center">
						{ this.props.allowBack &&
							<BackHistory />
						}
					</div>
					<div className="layout-row layout-align-start-center layout-align-xs-center-center flex">
						<div className="hide-xs">
							{ !this.props.menu &&
								<BackHistory/>
							}	
						</div>
						<Link href={"/"}>
							<Logo className="bold h6 serif">tilt.</Logo>
						</Link>
					</div>
					<div className="flex layout layout-align-end-center">
						<Link href={'/blog'}>
							<Blog className="px-16 small cursor-pointer">Blog</Blog>
						</Link>
						{	this.props.menu &&
							<Link href={'/browse'}>
								<Browse aria-label="Browse" name="Browse" className="layout layout-align-center-center p-4 rounded cursor-pointer">
									<SearchRounded style={{ fontSize: 20 }}/>
								</Browse>
							</Link>
						}
					</div>
				</div>
				{ this.props.menu &&
					<div style={{ borderTop: "1px solid rgba(255,255,255,0.2)"}} className="layout-row layout-align-center-center flex-none hide-xs width-100">
						<ul className="small flex-noshrink layout-row layout-align-center-stretch p-0 m-0 list-reset">
							<li className="layout-row layout-align-center-center">
								<Link href={"/"}>
									<NavButton className={clsx(this.props.activePage === undefined && "active bold", "layout-column layout-align-start-stretch cursor-pointer")}>
										<div className="layout-row layout-align-center-center px-16 flex">
											<span>All</span>
										</div>
									</NavButton>
								</Link>
							</li>
							{mediaSet && mediaSet.map((category, index) => (
								<li key={index} className="layout-row layout-align-center-center">
									<Link href={`/${category.slug}`}>
										<NavButton className={clsx(this.props.activePage === category.slug && "active bold", "layout-column layout-align-start-stretch cursor-pointer")}>
											<div className="layout-row layout-align-center-center px-16 flex">
												{(() => {
													switch(category.slug) {
														case 'movies': return <MovieTwoTone className="m-8" style={{ fontSize: 16 }}/>
														case 'tv-shows': return <TvTwoTone className="m-8" style={{ fontSize: 16 }}/>
														case 'video-games': return <SportsEsportsTwoTone className="m-8" style={{ fontSize: 16 }}/>
														case 'electronics': return <DevicesOtherTwoTone className="m-8" style={{ fontSize: 16 }}/>
													}
												})()}
												<span className="text-capitalize text-truncate">
													{(() => {
														switch(category.slug) {
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
				}
			</Shape>
		);
	};
}

Nav.defaultProps = {
  allowBack: true,
}

export { Nav };