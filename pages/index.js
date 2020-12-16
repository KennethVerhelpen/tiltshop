import { Page, Medium, Header } from '../components';
import mediaSet from "../lib/media";
import styled from '@emotion/styled';
class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			media: undefined,
			activeMedia: null,
		}
	}

	render = () => {

		const Grid = styled.main`
			@media only screen and (max-width: 959px) and (max-width: 959px) {
				max-width: 44rem; 
			}
		`
	
		return (
			<Page
				background="/images/index-background.jpg"
				alt="TiltShop"
				activeMedia={this.props.activeMedia}
				media={mediaSet}
				onClick={this.handleMediaSetChange}
				>
				<Header/>
				<Grid id="categories" className="container-lg p-0 layout-column">
					<div className="layout-row layout-wrap layout-align-start-center">
						{mediaSet.map((category => category.items && category.items.map((item, index) => (
							<div key={item.id} ref="article" className="p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
								<Medium className="flex layout-column layout-align-center-center" mediumIndex={index} item={item} category={category}/>
							</div>
						))))}
					</div>
				</Grid>
			</Page>
		);
	};
};

export default Home
