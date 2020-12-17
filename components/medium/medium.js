import { ArrowForwardRounded } from "@material-ui/icons";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import articlesSet from "../../lib/articles";
import { ImageWrapper, Main, Footer, Shape, Title, IconButton } from "./medium.styles";

class Medium extends React.Component {
	constructor(props) {
		super(props);
		this.mediumIndex = Number,
		this.mediumId = Number,
		this.item = Object,
		this.category = Object,
		this.className = String,
		this.onClick = Function
	}

	render() {
		const articlesLength = (articlesSet.filter(article => article.medium === this.props.mediumId && article.category === this.props.category.id)).length;

		return (
			<Link href={`${this.props.category.slug}/${this.props.item.slug}`}>
				<article className={clsx(this.props.className, "cursor-pointer")}>
					<Shape onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}
						className="width-100 relative cursor-pointer layout-column layout-align-end-stretch text-center overflow-hidden rounded-xl">
						<Main className="p-16 content layout-column layout-align-center-center">
							<Title className="h2 strong mb-8">{this.props.item.name}</Title>
							<span className="p bold text-capitalize">{this.props.category.type}</span>
						</Main>
						<Footer className="px-32 py-16 layout-row layout-align-start-center">
							<span className="text-left flex text-truncate">See all <b>{articlesLength}</b> articles</span>
							<IconButton className="button layout layout-align-center-center p-8 rounded">
								<ArrowForwardRounded style={{ fontSize: 16 }}/>
							</IconButton> 
						</Footer>
						<ImageWrapper className="image">
							<Image
								quality="100"
								layout="fill"
								objectFit="cover"
								objectPosition="center"
								priority={this.props.mediumIndex <= 2}
								loading={this.props.mediumIndex <= 2 ? "eager" : "lazy"}
								src={`/images/medium/${this.props.item.slug}/thumbnail-hover.jpg`}
								alt={this.props.item.name}
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
								alt={this.props.item.name}
							/>
						</ImageWrapper>
					</Shape>
				</article>
			</Link>
		);
	}
}

export { Medium };