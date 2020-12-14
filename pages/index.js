import { Page, Medium, Header } from '../components';
import { Column, BackgroundWrapper } from './index.styles';
import mediaSet from "../lib/media";
import Image from "next/image";
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
			<Page activeMedia={this.props.activeMedia} media={mediaSet} onClick={this.handleMediaSetChange}>
				<Header/>
				<main id="categories" className="container-lg p-0 layout-column">
					<div className="layout-row layout-wrap layout-align-center-center">
						{mediaSet.map((category => category.items && category.items.map((item, index) => (
							<Column key={item.id} ref="article" className="p-16 width-100">
								<Medium mediumIndex={index} item={item} category={category}/>
							</Column>
						))))}
					</div>
				</main>
				<BackgroundWrapper>
					<Image
						objectFit="cover"
						quality="100"
						objectPosition="center"
						priority={true}
						loading="eager"
						layout="fill"
						src="/images/index-background.jpg"
						alt="TiltShop header background"
						/>
				</BackgroundWrapper>
			</Page>
		);
	};
};

export default Home
