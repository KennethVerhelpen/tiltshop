import { Shape, Main, Footer, IconButton, ImageWrapper, BudgetRangeStyled } from './article.styles';
import clsx from "clsx";
import Image from 'next/image'
import media from "../../lib/media";
import { ArrowForwardRounded } from '@material-ui/icons';
class Article extends React.Component {
	constructor(props) {
		super(props);
		this.medium = String | undefined,
		this.articleIndex = Number | null,
		this.article = Object | undefined,
		this.className = String | undefined
	}

	render() {
		const category = media.find(category => category.id === this.props.article.category);
		const medium = category.items.find(medium => medium.id === this.props.article.medium);

		return (
			<a rel="sponsored" aria-label={this.props.article.title} className={clsx(this.props.className)} href={this.props.article.url} target="_blank">
				<Shape className="relative width-100 layout-column layout-align-end-stretch rounded-xl overflow-hidden cursor-pointer">
					<div className="flex"></div>
					<Main className="layout-column layout-align-start-start pt-32 px-32">
						<span style={{ opacity: .5 }} className="small mb-8">{this.props.article.type} / {this.props.medium}</span>
						<span className="strong h6 mb-8">{this.props.article.title.length > 45 ? `${this.props.article.title.slice(0,45)}...` : this.props.article.title}</span>
						{this.props.article.price.dollar && <BudgetRangeStyled className="rounded-sm px-16 py-4" amount={this.props.article.price.dollar}/>}
					</Main>
					<Footer className="px-32 py-16 layout-row layout-align-start-center">
						<span className="flex text-truncate">See on <b>Amazon</b></span>
						<IconButton className="button layout layout-align-center-center p-8 rounded">
							<ArrowForwardRounded style={{ fontSize: 16 }}/>
						</IconButton>
					</Footer>
					<ImageWrapper>
						<Image
							quality="100"
							layout="fill"
							objectFit="cover"
							objectPosition="center"
							priority={this.props.articleIndex <= 2}
							loading={this.props.articleIndex <= 2 ? "eager" : "lazy"}
							alt={`${this.props.article.imgAlt} - ${medium.name}`}
							src={`/images/articles/${category.slug}/${medium.slug}/${this.props.article.id}/article.jpg`}
						/>
					</ImageWrapper>
				</Shape>
			</a>
		);
	}
}

export { Article };