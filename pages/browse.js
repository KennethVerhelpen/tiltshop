import { Page, Article, Header } from '../components';
import articles from "../lib/articles";
import styled from '@emotion/styled';
class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	render = () => {

		const Grid = styled.main`
			@media only screen and (max-width: 959px) and (max-width: 959px) {
				max-width: 44rem; 
			}
		`
	
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
            {articles.map((article, index) => (
              <div key={article.id} className="p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
                <Article className="flex" articleIndex={index} article={article} />
              </div>
            ))}
					</div>
				</Grid>
			</Page>
		);
	};
};

export default Home
