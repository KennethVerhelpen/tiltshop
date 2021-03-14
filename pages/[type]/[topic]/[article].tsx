import { ArrowForwardRounded } from "@material-ui/icons";
import { types, topics, articles } from "../../../lib/data";
import { TypeType, TopicType, ArticleType } from "../../../lib/types/types";
import { Page, Article } from "../../../components/index";

type Props = {
  type: TypeType;
  topic: TopicType;
	article: ArticleType;
  articles: ArticleType[];
}

const ArticleDetails = (props: Props) => {
	const {type, topic, article, articles} = { ...props };
	return (
		<>
			<Page
				menu={false}
				title={`${article.title} - ${topic.name}`}
				description={article.description}
				history={`/${type.slug}/${topic.slug}`}
			>
				<main className="container-lg ">
					<div className="layout-column layout-gt-xs-row pt-gt-sm-128 pt-32 pb-128">
						<section className="flex-order-1 flex-order-gt-xs-0 flex p-16 p-gt-sm-32">
							<header>
								<h1 className="strong mb-8">{article.title}</h1>
								<h2 className="h6 mb-16">{topic.name}</h2>
								<h3 className="p text-capitalize mb-32 text-secondary-500">{type.name}</h3>
								<p className="lh-3 h6 mb-32">{article.description}</p>
								{article.details && article.details.length > 0 ? (
									<>
										<h4 className="bold h6 mb-16">Product details</h4>
										<ul className="lh-3 h6">
											{article.details.split(';').map(detail => (
												<li key={detail}>{detail}</li>
											))}
										</ul>
									</>
								) : null}
							</header>
							<main>
								
							</main>
						</section>
						<section className="flex-order-0 flex-order-gt-xs-1 flex-none p-16 p-gt-sm-32 layout-column layout-align-start-stretch layout-align-gt-xs-start-start">
							<div className="layout-align-start-stretch layout-column">
								<Article className="mb-32" disabled={true} article={article} topic={topic} type={type} />
								<a href={article.trackingUrl} target="_blank" rel="sponsored" className="text-left btn btn-outlined btn-md btn-secondary layout-row layout-align-start-center">
									<span className="flex">See on <b>Amazon</b></span>
									<ArrowForwardRounded style={{ fontSize: 20 }}/>
								</a>
							</div>
						</section>
					</div>

					<footer className="py-64 layout-column layout-align-center-center border-top border-secondary-200">
						<h4 className="p-32 bold text-center">Other cool articles you may like</h4>
						<main className="layout-row layout-wrap">
							{articles.slice(0,3).map(article => (
								<div key={article.id} className="fade-in-bottom speed-5 cascade p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
									<Article article={article} topic={topic} type={type}/>
								</div>
							))}
						</main>
					</footer>
				</main>
			</Page>
		</>
	);
};

export async function getStaticPaths() {
  const paths = articles.map(article => {
	const type = types.find(type => type.id === article.type);
	const topic = topics.find(topic => topic.id === article.topic);

	return {	
		params: {
			type: type.slug.toString(),
			topic: topic.slug.toString(),
			article: article.slug.toString(),
		}
	}})

  return {
		paths,
		fallback: false,
  }
};

export async function getStaticProps({
  params: {
		type: typeSlug,
		topic: topicSlug,
		article: articleSlug
	}}) {

	const currentType = types.find(type => type.slug === typeSlug);
	const currentTopic = topics.find(topic => topic.slug === topicSlug);
	const currentArticle = articles.find(articles => articles.slug === articleSlug);
	const similarArticles = (number) => {
		let filteredArticles = articles.filter(article => article.topic === currentArticle.topic && article.id != currentArticle.id);
		let shuffledArticles = filteredArticles.sort(() => Math.random() - 0.5);
		return ( shuffledArticles.slice(0,number))
	}

  return {
    props: {
			type: currentType,
			topic: currentTopic,
			article: currentArticle,
			articles: similarArticles(3),
    }
  }
}

export default ArticleDetails;