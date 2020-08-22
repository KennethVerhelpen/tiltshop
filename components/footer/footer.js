import Link from "next/link";
import FilterRounded from "@material-ui/icons/FilterRounded";

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
						<p className="logo-serif text-secondary-100 b h2">Tilt</p>
						<p className="h6 description text-secondary-100 mt-32">
							<b>Tilt is the best of Amazon</b>, curated by cinema lovers.
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