import { Page, Topic, Header } from '../components';
import styled from '@emotion/styled';
class Home extends React.Component {
	render = () => {
		const { types, topics, articles } = this.props;

		const Grid = styled.main`
			@media only screen and (max-width: 959px) and (max-width: 959px) {
				max-width: 44rem; 
			}
		`
	
		return (
			<Page allowBack={false}> 
				<Header	rotation={true}/>
				<Grid className="container-lg p-0 layout-column">
					<div className="layout-row layout-wrap layout-align-start-center">
						{topics.map((topic, index) => {
							const type = types.find(type => type.id === topic.type);
							const articlesCount = articles.filter(article => article.topic === topic.id).length;
							return (
								<div key={topic.id} ref="article" className="fade-in-bottom speed-5 cascade p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
									<Topic className="flex layout-column layout-align-center-center" count={articlesCount} topic={topic} type={type} index={index} />
								</div>
							)
						})}
					</div>
				</Grid>
			</Page>
		);
	};
};

export async function getStaticProps() {

  const types = (await import("../lib/types")).default;
  const topics = (await import("../lib/topics")).default;
  const articles = (await import("../lib/items")).default;

  return {
    props: {
      types: types,
      topics: topics,
      articles: articles,
    }
  }
}

export default Home
