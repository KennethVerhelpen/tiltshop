import { Page, Medium, Header } from '../components';
import mediaSet from "../lib/media";
class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			media: undefined,
			activeMedia: null,
		}
	}

	render = () => {
	
		return (
			<Page
				background="/images/index-background.jpg"
				alt="TiltShop"
				activeMedia={this.props.activeMedia}
				media={mediaSet}
				onClick={this.handleMediaSetChange}
				>
				<Header/>
				<main id="categories" className="container-lg p-0 layout-column">
					<div className="layout-row layout-wrap layout-align-start-center">
						{mediaSet.map((category => category.items && category.items.map((item, index) => (
							<div key={item.id} ref="article" className="p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
								<Medium className="flex layout-column layout-align-center-center" mediumIndex={index} item={item} category={category}/>
							</div>
						))))}
					</div>
				</main>
			</Page>
		);
	};
};

export default Home
