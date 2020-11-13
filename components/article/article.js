import article from './article.module.scss';
import Link from "next/link";
import { StarHalfTwoTone, Star, StarBorderTwoTone } from '@material-ui/icons';
class Article extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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

		const fullStars = this.props.article.ratings;
		const plainStars = Math.floor(this.props.article.ratings);
		const halfStar = ((Math.floor(this.props.article.ratings * 2) / 2).toFixed(1) - plainStars) > 0;
		const emptyStars = Math.floor(5 - this.props.article.ratings);
		console.log("plainStars", plainStars)
		console.log("halfStar",halfStar)
		console.log("emptyStars",emptyStars)
		return (
			<a href={this.props.article.url} target="_blank">
				<article className={`layout-column layout-align-space-between-stretch rounded-md ${article.shape}  overflow-hidden cursor-pointer`}>
					<header className={`${article.content} layout-row layout-align-end-center pt-16 px-16`}>
						<span className="small mr-4">$</span>
						<span className="serif h6 strong">{this.props.article.price}</span>
					</header>
					<footer className={`${article.content} layout-column layout-align-start-start p-32`}>
						<span className="small bold mb-8">{this.props.article.type}</span>
						<span className={`serif strong h6 ${article.name} mb-4`}>{this.props.article.title}</span>
						<div className="layout-row mb-16">
							{new Array(plainStars).fill(null).map(() => {
								return (
									<Star style={{ fontSize: 16 }} className={`${article.activeStar} p`}/>
								)
							})}
							{halfStar && <StarHalfTwoTone style={{ fontSize: 16 }} className={`${article.activeStar}`} />}
							{new Array(emptyStars).fill(null).map(() => {
								return (
									<StarBorderTwoTone style={{ fontSize: 16 }} className={`${article.inactiveStar}`} />
								)
							})}
						</div>
						<span className="small">
							{this.props.article.description.length > 60 ? `${this.props.article.description.slice(0, 60)}...` : this.props.article.description}
							{' '}
							<span className="small display-inline-block underline">Read more</span>
						</span>

					</footer>
					<img className={article.img} src={this.props.article.imgSrc}></img>
				</article>
			</a>
		);
	}
}

export { Article };