import Link from "next/link";

import footer from "./footer.module.scss";

class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			links: Object
		}
	}

	render = () => {
		return (
			<footer className="bg-secondary-900 py-64">
				<div className="container-md layout-row layout-align-start-start">
					<div className="layout-column layout-align-start-start">
						<img
							className={`mb-32 ${footer.logotype}`}
							src="/images/logotype-light.svg"
							alt="TiltShop logo"
						/>
						<p className="h6 description text-secondary-100">
							<b>TiltShop is the best of Amazon</b>, curated by cinema lovers.
						</p>
						<p className="description text-secondary-100 mb-32">
							Every item is hand-picked for Amazon catalogue and sorted out just
							for you.
						</p>

						<ul
							className={`px-16 layout-row text-secondary-100 ${footer.list}`}
						>
							{this.props.links.map((link, index) => {
								return (
									<li key={index} className={`small ${index > 0 ? "ml-32" : ""} ${footer.list}`}>
										<Link href={link.href}>
											<a>{link.label}</a>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</footer>
		);
	};
}

export default Footer;