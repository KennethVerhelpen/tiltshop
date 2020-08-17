import Link from "next/link";

import nav from "./nav.module.scss";

class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			links: Object
		}
	}

	render = () => {

		return (
			<nav
				className={`layout-row layout-align-start-center ${nav.shape}`}
			>
				<div className="container-md layout-row layout-align-start-center">
					<ul
						className={`small layout-row layout-align-center-center p-0 m-0 ${nav.links}`}
					>
						<li className="text-secondary-100 px-8 layout-row layout-align-center-center">
							<p className={`logo-serif b h5`}>Tilt</p>
						</li>
					</ul>
					<ul
						className={`small flex layout-row layout-align-end-center p-0 m-0 ${nav.links}`}
					>
						{this.props.links.map((link, index) => {
							return (
								<li key={index} className="text-secondary-100 px-8">
									<Link href={link.href}>
										<a>{link.label}</a>
									</Link>
								</li>
							);
						})}
					</ul>
					{this.props.children}
				</div>
			</nav>
		);
	};
}

export default Nav;