import { Page, Topic, Header } from "../components";
import styled from "@emotion/styled";
import { generateData } from "../lib/api"
import { TypeType, TopicType } from "../lib/types/types"
import { types, topics } from "../lib/data";

type Props = {
  types: TypeType[];
	topics: TopicType[];
};

const Grid = styled.main`
	@media only screen and (max-width: 959px) and (max-width: 959px) {
		max-width: 44rem; 
	}
`

const Home = (props: Props) => {
	const { types, topics } = { ...props };

	return (
		<Page
			allowBack={false}
			types={types}
		> 
			<Header	rotation={true}/>
			<Grid className="p-0 layout-column">
				<div className="container-lg layout-row layout-wrap layout-align-center-center">
					{topics.sort((a: TopicType, b: TopicType) => a.name.localeCompare(b.name, 'en', {'sensitivity': 'base'}))
						.map((topic, index) => {
						const type = types.find(type => type.id === topic.type);
						return (
							<div key={topic.id} className="fade-in-bottom speed-5 cascade p-16 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
								<Topic className="flex layout-column layout-align-center-center" count={topic.articlesCount} topic={topic} type={type} index={index} />
							</div>
						)
					})}
				</div>
			</Grid>
		</Page>
	);
};

export async function getStaticProps() {
	generateData();

  return {
    props: {
      types,
      topics,
    }
  }
}

export default Home
