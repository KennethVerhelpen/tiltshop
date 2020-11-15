import medium from './medium.module.scss';
import clsx from "clsx";
import Link from "next/link";
class Medium extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			item: Object,
			category: Object,
			count: Number,
			className: true,
			isHovered: false,
			onClick: Function
		};
	}

	handleHover = () => {
		this.setState((prevState) => ({
			isHovered: !prevState.isHovered,
		}));
	}

	mountStyles = () => {
		this.setState({
			className: "fade-in-bottom speed-9",
		})
	}

	componentDidMount = () => {
		setTimeout(this.mountStyles, 0);
	};

	render() {
		const hoverClass = this.props.isHovered ? "" : "";

		return (
			<Link href={`${this.props.category.slug}/${this.props.item.slug}`}>
				<article className={clsx(this.props.className)}>
					<main onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} className={`layout-column layout-align-center-center p-32 text-center rounded-md ${medium.shape} ${hoverClass} overflow-hidden cursor-pointer`}>
						<div className={`${medium.content} layout-column layout-align-center-center`}>
							<div className={`${medium.icon} rounded layout-column layout-align-center-center mb-8`}>{this.props.category.icon}</div>
							<span className={`h1 serif strong ${medium.name}`}>{this.props.item.name}</span>
							<a className="mt-8 underline">See all articles</a>
						</div>
						<img className={medium.img} src={this.props.item.imgSrc} alt={this.props.item.imgSrc}></img>
					</main>
				</article>
			</Link>
		);
	}
}

export { Medium };