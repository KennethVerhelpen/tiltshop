import { Page, Topic, Header } from '../components/index';
import { getTopics, getTypes } from "../lib/api";
import { throttleApi } from "../lib/utils";
import styled from '@emotion/styled';

const Grid = styled.main`
	@media only screen and (max-width: 959px) and (max-width: 959px) {
		max-width: 44rem; 
	}
`
class Type extends React.Component {
	render = () => {
		const { types, type, topics } = this.props;

		return (
			<Page 
				title={`Best items for ${type.name} lovers`}
				description={`Discover the best hand-picked items of ${new Date().getFullYear()} sorted out just for ${type.name} lovers.`}
				activePage={type.slug}
				types={types}
			>
				<Header category={type.name}/>
				<Grid className="container-lg p-0 layout-column">
					<div className="layout-row layout-wrap layout-align-center-center">
						{topics.map((topic, index) => {
							return (
								<div key={topic.id} ref="article" className="fade-in-bottom speed-5 cascade p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
									<Topic className="flex layout-column layout-align-center-center" count={topic.articlesCount} topic={topic} type={type} index={index} />
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
	const types = await throttleApi(0, getTypes());

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
	
	const topics = await throttleApi(0, getTopics());
	const types = await throttleApi(0, getTypes());
	
	const currentType = types.find(type => type.slug === typeSlug);
	const currentTopics = topics.filter(topic => topic.type === currentType.id && topic.articlesCount >= 0);
	return { 
		props: {
			types: types,
			type: currentType,
			topics: currentTopics,
		}
	}
}

export default Type
