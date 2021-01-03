import { Page, Article } from "../../../components/index";
import mediaSet from "../../../lib/media";

class ArticleDetails extends React.Component {
  constructor(props) {
    super(props);
	}

  render = () => {
    return (
      <>
			<Page
          media={mediaSet}
          menu={false}
          title={this.props.article.title}
          >
					<main className="container-lg ">

						<div className="layout-row py-128">
							<section className="flex p-32">
								<header>
									<h1 className="strong mb-8">{this.props.article.title}</h1>
									<h2 className="h6 mb-16">{this.props.medium.name}</h2>
									<h3 className="p text-capitalize mb-32" style={{ opacity: 0.5 }}>{this.props.category.type}</h3>
									<p className="lh-3 h6">{this.props.article.description}</p>
								</header>
								<main>
									
								</main>
							</section>
							<section className="flex-33 p-32">
								<Article static={true} article={this.props.article} medium={this.props.medium.name}/>
							</section>
						</div>

						<footer className="py-64 layout-column layout-align-center-center border-top border-secondary-500">
							<h4 className="p-32 bold h4">Other articles you may like</h4>
							<main className="layout-row">
								{this.props.articles.slice(0,3).map(article => (
									<div key={article.id} className="fade-in-bottom speed-5 cascade p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
										<Article article={article} medium={this.props.medium.name}/>
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
	const media = (await import("../../../lib/media")).default;
	const articles = (await import ("../../../lib/articles.js")).default;

  const paths = articles.map(article => ({
			params: {
				category: media.find(category => category.id === article.category).slug.toString(),
				medium: media.find(category => category.id === article.category).items.find(medium => medium.id === article.medium).slug.toString(),
				article: article.slug.toString(),
			}
		}))
	
  return {
		paths,
		fallback: false,
  }
};

export async function getStaticProps({
  params: { category, medium, article }
	}) {

	const media = (await import("../../../lib/media.js")).default;
	const articles = (await import ("../../../lib/articles.js")).default;

	const activeCategory = media.find(item => item.slug === category);
	const activeMedium = activeCategory.items.find(item => item.slug === medium);
	const activeArticle = articles.find(item => item.slug.toString() === article); 
	const activeArticles = articles.filter(item => item.category === activeCategory.id && item.medium === activeMedium.id && item.id != activeArticle.id); 

  return {
    props: {
			category: activeCategory,
			medium: activeMedium,
			article: activeArticle,
			articles: activeArticles,
    }
  }
}

export default ArticleDetails;