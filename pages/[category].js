import { Page, Medium } from '../components/index';
import mediaSet from "../lib/media";
import index from "./index.module.scss";
import clsx from "clsx";

class Category extends React.Component {

	constructor(props) {
		super(props);
		this.rotatingTextsWrapper = React.createRef();
		this.rotatingTexts = ["movie lovers", "tv shows addicts", "passionate gamers"];
		this.state = {
			visibleText: 0
		}
	}

	render = () => {
		return (
			<Page activePage={this.props.category.slug}>
				<header className={`${index.header} text-center`}>
					<div className="container-md layout-column layout-align-center-center">
						<h1 className={`${index.logo} serif strong`}>{this.props.type}</h1>
						<h2 className={`serif lh-2 mt-16 p ${index.title}`}>
							<span>A currated list of items for</span><br/>
							<span className="h4" ref={this.rotatingTextsWrapper}>
								{this.rotatingTexts.map((text, index) => {
									return (
										<b className={clsx({ "hide": this.state.visibleText != index })} key={index}>{text}.</b>
									)
								})}
							</span>
						</h2>
					</div>
				</header>
				<main className={`${index.pageContent} container-lg p-0 layout-column`}>
					<div className="layout-row layout-wrap layout-align-center-center">
						{this.props.category.items.map((item) => {
							return (
								<div key={item.id} ref="article" className={`p-16 ${index.column}`}>
										<Medium item={item} category={this.props.category}/>
									</div>
								)
							})
						 }
					</div>
				</main>
				<img className={index.pageBg} src="/images/header-bg-02.jpg"/>
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
