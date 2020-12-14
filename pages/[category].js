import { Page, Medium, Header } from '../components/index';
import { Column, BackgroundWrapper } from './index.styles';
import Image from "next/image";

class Category extends React.Component {

	constructor(props) {
		super(props);
	}

	render = () => {
		return (
			<Page activePage={this.props.category.slug}>
				<Header category={this.props.category.type}/>
				<main className="container-lg p-0 layout-column">
					<div className="layout-row layout-wrap layout-align-center-center">
						{this.props.category.items.map((item) => {
							return (
								<Column key={item.id} ref="article" className="p-16 width-100">
									<Medium item={item} category={this.props.category}/>
								</Column>
								)
							})
						 }
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
