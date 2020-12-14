import article from './article.module.scss';
import clsx from "clsx";
import Image from 'next/image'
import media from "../../lib/media";
import styled from '@emotion/styled';
import { StarHalfTwoTone, Star, StarBorderTwoTone, ArrowForwardRounded } from '@material-ui/icons';
class Article extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			articleIndex: Number,
			className: true,
			article: Object
		};
	}

	mountStyles = () => {
		this.setState({
			className: "fade-in-bottom speed-9",
		})
	}

	componentDidMount = () => {
		setTimeout(this.mountStyles,0);
	};

	render() {
		const plainStars = Math.floor(this.props.article.ratings);
		const halfStar = ((Math.floor(this.props.article.ratings * 2) / 2).toFixed(1) - plainStars) > 0;
		const emptyStars = Math.floor(5 - this.props.article.ratings);
		const category = media.find(category => category.id === this.props.article.category);
		const medium = category.items.find(medium => medium.id === this.props.article.medium);

		const Shape = styled.article`
			width: 100%;
			height: 30rem;
			max-width: 20rem;
			position: relative;
			box-shadow: 6px 6px 20px 0 rgba(0,0,0,0.35), 5px 5px 7px 0 rgba(0,0,0,0.09), 20px 20px 8px 0 rgba(0,0,0,0.08);
		`

		const Main = styled.main`
			span {
				color: white;
			}
		`

		const Footer = Main.withComponent('footer');

		const ImageWrapper = styled.div`
			z-index: -1;
		`

		return (
			<a aria-label={this.props.article.title} className={clsx(this.props.className)} href={this.props.article.url} target="_blank">
				<Shape className="layout-column layout-align-end-stretch rounded-xl overflow-hidden cursor-pointer">
					<Main className="layout-column layout-align-start-start pt-32 px-32">
						<span style={{ opacity: .5 }} className="small mb-8">{this.props.article.type}</span>
						<span className="strong h6 mb-8">{this.props.article.title}</span>
						<div className="layout-row">
							{Array.from(Array(plainStars), (number, index) => {
								return (
									<Star key={index} style={{ fontSize: 16 }} className={`${article.activeStar}`} />
								)
							})}
							{halfStar && <StarHalfTwoTone style={{ fontSize: 16 }} className={`${article.activeStar}`} />}
							{Array.from(Array(emptyStars), (number, index) => {
								return (
									<StarBorderTwoTone key={index} style={{ fontSize: 16 }} className={`${article.inactiveStar}`} />
								)
							})}
						</div>
					</Main>
					<Footer className="px-32 py-16 layout-row layout-align-start-center">
						<span className="flex text-truncate">See on <b>Amazon</b></span>
						<div className="layout layout-align-center-center p-8 rounded">
							<ArrowForwardRounded style={{ fontSize: 16 }}/>
						</div>
					</Footer>
					<ImageWrapper>
						<Image
							quality="100"
							layout="fill"
							objectFit="cover"
							objectPosition="center"
							priority={this.props.articleIndex <= 2}
							loading={this.props.articleIndex <= 2 ? "eager" : "lazy"}
							className={article.img}
							alt={this.props.article.imgAlt}
							src={`/images/articles/${category.slug}/${medium.slug}/${this.props.article.id}/article.jpg`}
						/>
					</ImageWrapper>
				</Shape>
			</a>
		);
	}
}

export { Article };