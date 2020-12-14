import { Page, Medium, Header } from '../components/index';
import Image from "next/image";
import styled from '@emotion/styled';

class Category extends React.Component {

	constructor(props) {
		super(props);
	}

	render = () => {

		const Column = styled.div`
			max-width: 22rem;
		`

		return (
			<Page 
				alt="TiltShop"
				background="/images/index-background.jpg"
				activePage={this.props.category.slug}
				>
				<Header category={this.props.category.type}/>
				<main className="container-lg p-0 layout-column">
					<div className="layout-row layout-wrap layout-align-center-center">
						{this.props.category.items.map((item) => {
							return (
								<div key={item.id} ref="article" className="p-16 flex-33 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
									<Medium className="flex layout-column layout-align-center-center" item={item} category={this.props.category}/>
								</div>
								)
							})
						 }
					</div>
				</main>
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
