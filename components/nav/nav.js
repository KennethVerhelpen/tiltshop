import clsx from 'clsx';
import nav from "./nav.module.scss";

class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			links: Object,
			onClick: Function,
			activeLink: Number,
		}
	}

	render = () => {
		return (
			<nav className={`layout-column ${nav.shape} layout-align-center-center`}>
				<span className={`${nav.logo} hide show-xs bold h6 serif`}>TiltShop</span>
				<ul className={`hide-xs layout-fill small flex layout-row layout-align-center-stretch p-0 m-0 ${nav.links}`}>
					{this.props.links && this.props.links.map((link, index) => {
						return (
							<li key={index} className="layout-row layout-align-center-center">
								<button className={clsx({ 'active': (index === this.props.activeLink) }, `${nav.btn} layout-column layout-align-start-stretch`)} onClick={() => this.props.onClick(index)}>
									<div className="layout-row layout-align-center-center px-16 flex">
										{link.icon && <div className="layout-column layout-align-center-center m-8">{link.icon}</div>}
										<span>{link.type}</span>
									</div>
								</button>
							</li>
						);
					})}
				</ul>
			</nav>
		);
	};
}

export { Nav };