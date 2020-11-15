import clsx from 'clsx';
import nav from "./nav.module.scss";
import mediaSet from "../../lib/media";
import Link from "next/link";
class Nav extends React.Component {
	constructor(props) {
		super(props);
		mediaSet,
		this.state = {
			activePage: String,
		}
	}

	render = () => {
		return (
			<nav className={`layout-column ${nav.shape} layout-align-center-center`}>
				<span className={`${nav.logo} hide show-xs bold h6 serif`}>TiltShop</span>
				<ul className={`hide-xs layout-fill small flex layout-row layout-align-center-stretch p-0 m-0 ${nav.links}`}>
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
											{category.icon && <div className="layout-column layout-align-center-center m-8">{category.icon}</div>}
											<span>{category.type}</span>
										</div>
									</a>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		);
	};
}

export { Nav };

// `${nav.btn} layout-column layout-align-start-stretch`