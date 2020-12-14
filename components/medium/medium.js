import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ImageWrapper, Content, Shape, Title } from "./medium.styles";
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

	 shouldComponentUpdate() {
    return false;
  }

	render() {

		return (
			<Link href={`${this.props.category.slug}/${this.props.item.slug}`}>
				<article className={clsx(this.props.className, "cursor-pointer")}>
					<Shape onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}
						className="width-100 relative cursor-pointer layout-column layout-align-end-center p-32 text-center overflow-hidden rounded-xl">
						<Content className="content layout-column layout-align-center-center">
							<Title className="h2 strong mb-8">{this.props.item.name}</Title>
							<span className="p bold text-capitalize">{this.props.category.type}</span>
							<span className="mt-8 small" style={{ opacity: 0.5 }}>See all articles</span>
						</Content>
						<ImageWrapper className="image">
							<Image
								quality="100"
								layout="fill"
								objectFit="cover"
								objectPosition="center"
								priority={this.props.mediumIndex <= 2}
								loading={this.props.mediumIndex <= 2 ? "eager" : "lazy"}
								src={`/images/medium/${this.props.item.slug}/thumbnail-hover.jpg`}
								alt={this.props.item.imgAlt}
							/>
						</ImageWrapper>
						<ImageWrapper className="image">
							<Image
								quality="100"
								layout="fill"
								objectFit="cover"
								objectPosition="center"
								priority={this.props.mediumIndex <= 2}
								loading={this.props.mediumIndex <= 2 ? "eager" : "lazy"}
								src={`/images/medium/${this.props.item.slug}/thumbnail.jpg`}
								alt={this.props.item.imgAlt}
							/>
						</ImageWrapper>
					</Shape>
				</article>
			</Link>
		);
	}
}

export { Medium };