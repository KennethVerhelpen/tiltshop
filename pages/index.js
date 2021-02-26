import { useEffect } from "react";
import { Page, Topic, Header } from "../components";
import styled from "@emotion/styled";
import { generateData } from "../lib/api"
import { types, topics } from "../lib/data";
class Home extends React.Component {
	render = () => {
		const { types, topics } = this.props;

		const Grid = styled.main`
			@media only screen and (max-width: 959px) and (max-width: 959px) {
				max-width: 44rem; 
			}
		`
		
		return (
			<Page
				allowBack={false}
				types={types}
			> 
				<Header	rotation={true}/>
				<Grid className="p-0 layout-column">
					<div className="container-lg layout-row layout-wrap layout-align-center-center">
						{topics.sort((a, b) => a.name.localeCompare(b.name, 'en', {'sensitivity': 'base'}))
							.map((topic, index) => {
							const type = types.find(type => type.id === topic.type);
							return (
								<div key={topic.id} ref="article" className="fade-in-bottom speed-5 cascade p-16 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
									<Topic className="flex layout-column layout-align-center-center" count={topic.articlesCount} topic={topic} type={type} index={index} />
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
	generateData();

  return {
    props: {
      types,
      topics,
    }
  }
}

export default Home
