import { Page, Medium, Header } from '../components/index';
import styled from '@emotion/styled';

class Category extends React.Component {

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
				alt="TiltShop"
				title={`TiltShop - The best items for ${this.props.category.type} lovers`}
				description={`Discover the best hand-picked items from Amazon's catalogue sorted out just for ${this.props.category.type} lovers`}
				activePage={this.props.category.slug}
				>
				<Header category={this.props.category.type}/>
				<Grid className="container-lg p-0 layout-column">
					<div className="layout-row layout-wrap layout-align-center-center">
						{this.props.category.items.map((item) => (
							<div key={item.id} ref="article" className="p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
								<Medium className="flex layout-column layout-align-center-center" item={item} category={this.props.category}/>
							</div>
						))}
					</div>
				</Grid>
			</Page>
		);
	};
}

export async function getStaticPaths() {
	const media = (await import("../lib/media.js")).default;
	const paths = media.map((category => ({
		params: {
			category: category.slug.toString(),
		}
	}
	))).flat();
	return {
		paths,
		fallback: false
	}
};

export async function getStaticProps({
	params: { category }
}) {
	const media = (await import("../lib/media.js")).default;
	const items = media.map((categories => categories)).flat();
	const activeCategory = items.find(item => item.slug === category);
	return {
		props: {
			category: activeCategory,
			id: activeCategory.id,
			type: activeCategory.type,
			slug: activeCategory.slug
		}
	}
}

export default Category
