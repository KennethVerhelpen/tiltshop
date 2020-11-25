import clsx from 'clsx';
import nav from "./nav.module.scss";
import mediaSet from "../../lib/media";
import Link from "next/link";
import Select from 'react-select'
import { MovieTwoTone, TvTwoTone, SportsEsportsTwoTone } from '@material-ui/icons';
class Nav extends React.Component {
	constructor(props) {
		super(props);
		mediaSet,
		this.state = {
			activePage: String,
			isSearchVisible: false
		}
	}

	handleSearchReveal = () => {
		this.setState(prevState => ({
			// isSearchVisible: !prevState.isSearchVisible
		}))
	}

	render = () => {
		const allMediaItems = mediaSet.map((category => category.items && category.items)).flat();
		const selectOptions = allMediaItems.map((item) => {
			return ({
				value: item.name,
				label: item.name
			})
		});
		return (
			<nav className={`layout-row ${nav.shape} layout-align-stretch-center`}>
				<div className="container-lg layout-align-stretch-center layout-row">
					<div className="flex hide-gt-xs"></div>
					<div className="layout-column layout-align-center-center flex-xs">
						<Link href={"/"}>
							<a className={`${nav.logo} bold h6 serif`}>TiltShop</a>
						</Link>
					</div>
					<div className={clsx({ "hide": !this.state.isSearchVisible }, "layout-row layout-align-center-center flex-noshrink")}>
						<Select id="media-selector" className="width-100" options={selectOptions} instanceId="media-selector"/>
					</div>
					<ul className={clsx({ "hide": this.state.isSearchVisible }, `hide-xs small flex-noshrink layout-row layout-align-center-stretch p-0 m-0 ${nav.links}`)}>
						<li className="layout-row layout-align-center-center">
							<Link href={"/"}>
								<a className={clsx(this.props.activePage === undefined && `${nav.activeLink}`, `${nav.btn} layout-column layout-align-start-stretch`)}>
									<div className="layout-row layout-align-center-center px-16 flex">
										<span>All</span>
									</div>
								</a>
							</Link>
						</li>
						{mediaSet && mediaSet.map((category, index) => {
							return (
								<li key={index} className="layout-row layout-align-center-center">
									<Link href={`/${category.slug}`}>
										<a className={clsx(this.props.activePage === category.slug && `${nav.activeLink}`, `${nav.btn} layout-column layout-align-start-stretch`)}>
											<div className="layout-row layout-align-center-center px-16 flex">
												{(() => {
													switch(category.slug) {
														case 'movies': return (<MovieTwoTone className="m-8" style={{ fontSize: 16 }}/>)
														case 'tv-shows': return (<TvTwoTone className="m-8" style={{ fontSize: 16 }}/>)
														case 'video-games': return (<SportsEsportsTwoTone className="m-8" style={{ fontSize: 16 }}/>)
													}
												})()}
												<span>{category.type}</span>
											</div>
										</a>
									</Link>
								</li>
							);
						})}
					</ul>
					<div className="layout-column layout-align-center-end flex-xs">
						{/* <button className={`${nav.searchBtn} m-0 btn btn-default btn-fab btn-xs layout-column layout-align-center-center`} onClick={this.handleSearchReveal}>
							<SearchTwoTone/>
						</button> */}
					</div>
				</div>
			</nav>
		);
	};
}

export { Nav };

// `${nav.btn} layout-column layout-align-start-stretch`