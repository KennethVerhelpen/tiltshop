import { Page, Topic, Header } from '../components/index';
import styled from '@emotion/styled';

const Grid = styled.main`
	@media only screen and (max-width: 959px) and (max-width: 959px) {
		max-width: 44rem; 
	}
`
class Type extends React.Component {
	render = () => {
		const { type, topics, articles } = this.props;

		return (
			<Page 
				title={`Best items for ${type.name} lovers`}
				description={`Discover the best hand-picked items of ${new Date().getFullYear()} sorted out just for ${type.name} lovers.`}
				activePage={type.slug}
				>
				<Header category={type.name}/>
				<Grid className="container-lg p-0 layout-column">
					<div className="layout-row layout-wrap layout-align-center-center">
						{topics.map((topic, index) => {
							const articlesCount = articles.filter(article => article.topic === topic.id).length
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
}

export async function getStaticPaths() {
	const types = (await import("../lib/types")).default;

	const paths = types.map(type => ({
		params: {
			type: type.slug.toString(),
		}
	}));

	return {
		paths,
		fallback: false
	}
};

export async function getStaticProps({
	params: { type: typeSlug }
}) {
	const types = (await import("../lib/types")).default;
	const topics = (await import("../lib/topics")).default;
	const articles = (await import("../lib/items")).default;

	const currentType = types.find(type => type.slug === typeSlug);
	const currentTopics = topics.filter(topic => topic.type === currentType.id);
	return { 
		props: {
			type: currentType,
			topics: currentTopics,
			articles: articles,
		}
	}
}

export default Type
