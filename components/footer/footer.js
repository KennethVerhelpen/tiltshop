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
			<footer className="py-64">
				<div className="container-md layout-row layout-align-center-center">
					<div className="layout-column layout-align-start-center text-center">
						<p className="logo-serif strong h6 serif">TiltShop</p>
						<p className="p description text-secondary-100 mt-8 serif">
							<b>TiltShop is the best of Amazon</b>, curated by movies, tv shows and video games lovers.
						</p>
						<p className="small description text-secondary-100 mb-32">
							Every item is hand-picked from Amazon catalogue and sorted out just
							for you.
						</p>
						<ul
							className={`px-16 layout-row text-secondary-100 ${footer.list}`}
						>
							{this.props.links && this.props.links.map((link, index) => {
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

export {Footer};