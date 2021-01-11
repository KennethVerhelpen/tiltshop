import { Shape, Main, Footer, IconButton, ImageWrapper, BudgetRangeStyled } from "./article.styles";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { ArrowForwardRounded } from "@material-ui/icons";
class Article extends React.Component {
	constructor(props) {
		super(props);
		this.type = Object,
		this.topic = Object,
		this.index = Number,
		this.disabled = Boolean,
		this.article = Object,
		this.className = String
	}

	render() {
		const { type, topic, index, disabled, article, className } = this.props;

		return (
			<a rel="sponsored" aria-label={article.title} className={clsx(className)} href={article.trackingUrl} target="_blank">
				<Shape className="bg-secondary-900 relative width-100 layout-column layout-align-end-stretch rounded-xl overflow-hidden cursor-pointer">
					<div className="flex"></div>
					<Main className={clsx({"pb-32" : disabled}, "layout-column layout-align-start-start pt-32 px-32")}>
						<span className="text-secondary-500 small mb-8 text-capitalize">{type.name} / {topic.name}</span>
						<span className="text-secondary-100 strong h6 mb-8">{article.title.length > 45 ? `${article.title.slice(0,45)}...` : article.title}</span>
						{ !disabled &&
							<>
								{ article.description &&
									<span className="small mb-8 text-secondary-500">
										<span>{article.description.slice(0,20)}...</span>
										{' '}
										<Link href={`/${type.slug}/${topic.slug}/${article.slug}`}>
											<span className="underline text-secondary-300" aria-label="Read more" target="_blank">Read more</span>
										</Link>
									</span>
								 }
								{article.price.dollar != null && <BudgetRangeStyled className="rounded-sm px-16 py-4 text-secondary-100" amount={article.price.dollar}/>}
							</>
						}
					</Main>
					{ !disabled &&
						<Footer className="px-32 py-16 layout-row layout-align-start-center">
							<span className="flex text-truncate text-secondary-100">See on <b>Amazon</b></span>
							<IconButton className="layout layout-align-center-center p-8 rounded">
								<ArrowForwardRounded className="text-secondary-100" style={{ fontSize: 16 }}/>
							</IconButton>
						</Footer>
					}
					<ImageWrapper>
						<Image
							quality="100"
							layout="fill"
							objectFit="cover"
							objectPosition="center"
							priority={index <= 2}
							loading={index <= 2 ? "eager" : "lazy"}
							alt={`${article.imgAlt} - ${topic.name}`}
							src={`/images/articles/${type.slug}/${topic.slug}/${article.id}/article.jpg`}
						/>
					</ImageWrapper>
				</Shape>
			</a>
		);
	}
}

export { Article };