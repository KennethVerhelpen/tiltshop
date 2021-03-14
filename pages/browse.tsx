import { Page, Article, Header } from "../components";
import { types, topics, articles } from "../lib/data";
import { TypeType, TopicType, ArticleType } from "../lib/types/types"
import styled from "@emotion/styled";

type Props = {
	types: TypeType[];
	topics: TopicType[];
	articles: ArticleType[];
}

const Grid = styled.main`
	@media only screen and (max-width: 959px) and (max-width: 959px) {
		max-width: 44rem; 
	}
`

const Browse = (props: Props) => {
	const { types, topics, articles } = { ...props };

	return (
		<Page
			activePage={"browse"}
			menu={false}
		>
			<Header
				title="Browse all items"
				subtitle="Easily find all items hand-picked just for you."
			/>
			<Grid className="p-0 layout-column">
				<div className="container-lg layout-row layout-wrap layout-align-center-center">
					{articles.map((article, index) => {
						const type = types.find(type => type.id === article.type);
						const topic = topics.find(topic => topic.id === article.topic);
						return (   
							<div key={article.id} className="fade-in-bottom speed-5 cascade p-16 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
								<Article className="flex" index={index} article={article} topic={topic} type={type}/>
							</div>
						)
					})}
				</div>
			</Grid>
		</Page>
	);
};

export async function getStaticProps() {
	const shuffledArticles = articles.sort(() => Math.random() - 0.5);

  return {
    props: {
      types,
      topics,
      articles: shuffledArticles,
    }
  }
}

export default Browse
