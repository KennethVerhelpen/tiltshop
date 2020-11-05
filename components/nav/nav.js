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
			<nav className={`layout-column ${nav.shape}`}>
				<ul className={`hide-xs layout-fill small flex layout-row layout-align-center-stretch p-0 m-0 ${nav.links}`}>
					{this.props.links && this.props.links.map((link, index) => {
						return (
							<li key={index} className="layout-row layout-align-center-center">
								<button className={clsx({ 'test': (index === this.props.activeLink)}, `${nav.btn} layout-row layout-align-center-center px-16` )} onClick={() => this.props.onClick(index)}>
									{link.icon && <div className="layout-column layout-align-center-center m-8">{link.icon}</div>}
									<span>{link.type}</span>
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