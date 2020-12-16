import clsx from 'clsx';
import { Shape, NavButton, Browse, Logo } from "./nav.styles";
import mediaSet from "../../lib/media";
import Link from "next/link";
import { MovieTwoTone, TvTwoTone, SportsEsportsTwoTone, SearchRounded } from '@material-ui/icons';
class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.activePage = String
	}

	render = () => {
		return (
			<Shape className="layout-row layout-align-stretch-center">
				<div className="container-lg layout-align-stretch-center layout-row">
					<div className="flex hide-gt-xs"></div>
					<div className="layout-row layout-align-start-center layout-align-xs-center-center flex">
						<Link href={"/"}>
							<Logo className="bold h6 serif">tilt.</Logo>
						</Link>
					</div>
					<ul className="hide-xs small flex-noshrink layout-row layout-align-center-stretch p-0 m-0 list-reset">
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
								{console.log("Active", this.props.activePage)}
								<Link href={`/${category.slug}`}>
									<NavButton className={clsx(this.props.activePage === category.slug && "active bold", "layout-column layout-align-start-stretch cursor-pointer")}>
										<div className="layout-row layout-align-center-center px-16 flex">
											{(() => {
												switch(category.slug) {
													case 'movies': return (<MovieTwoTone className="m-8" style={{ fontSize: 16 }}/>)
													case 'tv-shows': return (<TvTwoTone className="m-8" style={{ fontSize: 16 }}/>)
													case 'video-games': return (<SportsEsportsTwoTone className="m-8" style={{ fontSize: 16 }}/>)
												}
											})()}
											<span className="text-capitalize">{category.type}</span>
										</div>
									</NavButton>
								</Link>
							</li>
						))}
					</ul>
					<Browse className="flex layout layout-align-end-center">
						<Link href={`/browse`}>
							<a aria-label="Browse" name="Browse" className="layout layout-align-center-center p-4 rounded">
								<SearchRounded/>
							</a>
						</Link>
					</Browse>
				</div>
			</Shape>
		);
	};
}

export { Nav };