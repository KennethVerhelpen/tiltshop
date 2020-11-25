import medium from './medium.module.scss';
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { MovieTwoTone, TvTwoTone, SportsEsportsTwoTone } from '@material-ui/icons';
class Medium extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mediumIndex: Number,
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
							<div className={`${medium.icon} rounded layout-column layout-align-center-center mb-8`}>
								{(() => {
									switch (this.props.category.slug) {
										case 'movies': return (<MovieTwoTone className="m-8" style={{ fontSize: 16 }} />)
										case 'tv-shows': return (<TvTwoTone className="m-8" style={{ fontSize: 16 }} />)
										case 'video-games': return (<SportsEsportsTwoTone className="m-8" style={{ fontSize: 16 }} />)
									}
								})()}
							</div>
							<span className={`h1 serif strong ${medium.name}`}>{this.props.item.name}</span>
							<span className="mt-8 underline">See all articles</span>
						</div>
						<Image
							quality="100"
							width={352}
							height={544}
							priority={this.props.mediumIndex <= 2}
							loading={this.props.mediumIndex <= 2 ? "eager" : "lazy"}
							className={medium.img}
							src={this.props.item.imgSrc}
							alt={this.props.item.imgAlt}
						/>
					</main>
				</article>
			</Link>
		);
	}
}

export { Medium };