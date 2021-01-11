import { ArrowForwardRounded } from "@material-ui/icons";
import { Page, Article } from "../../../components/index";

class ArticleDetails extends React.Component {
	render() {
		const {type, topic, article, articles} = this.props;

		return (
      <>
				<Page
					menu={false}
					title={`${article.title} - ${topic.name}`}
					description={article.description}
					history={`/${type.slug}/${topic.slug}`}
				>
					<main className="container-lg ">
						<div className="layout-row py-128">
							<section className="flex p-32">
								<header>
									<h1 className="strong mb-8">{article.title}</h1>
									<h2 className="h6 mb-16">{topic.name}</h2>
									<h3 className="p text-capitalize mb-32 text-secondary-500">{type.name}</h3>
									<p className="lh-3 h6 mb-32">{article.description}</p>
									{article.details.length > 0 ? (
										<>
											<h4 className="bold h6 mb-16">Product details</h4>
											<ul className="lh-3 h6">
												{article.details.map(detail => (
													<li key={detail}>{detail}</li>
												))}
											</ul>
										</>
									) : null}
								</header>
								<main>
									
								</main>
							</section>
							<section className="flex-none p-32 layout-column layout-align-start-stretch">
								<Article className="mb-32" disabled={true} article={article} topic={topic} type={type} />
								<a href={article.trackingUrl} target="_blank" rel="sponsored" className="text-left btn btn-outlined btn-md btn-secondary layout-row layout-align-start-center">
									<span className="flex">See on <b>Amazon</b></span>
									<ArrowForwardRounded style={{ fontSize: 20 }}/>
								</a>
							</section>
						</div>

						<footer className="py-64 layout-column layout-align-center-center border-top border-secondary-300">
							<h4 className="p-32 bold h4">Other articles you may like</h4>
							<main className="layout-row">
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
}

export async function getStaticPaths() {
	const types = (await import("../../../lib/types")).default;
	const topics = (await import("../../../lib/topics")).default;
	const articles = (await import ("../../../lib/items")).default;

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

	const types = (await import("../../../lib/types")).default;
	const topics = (await import("../../../lib/topics")).default;
	const articles = (await import ("../../../lib/items")).default;

	const currentType = types.find(type => type.slug === typeSlug);
	const currentTopic = topics.find(topic => topic.slug === topicSlug);
	const currentArticle = articles.find(articles => articles.slug === articleSlug);
	const similarArticles = articles.filter(article => article.topic === currentArticle.topic);

  return {
    props: {
			type: currentType,
			topic: currentTopic,
			article: currentArticle,
			articles: similarArticles,
    }
  }
}

export default ArticleDetails;