import { Page, Medium } from '../components/index';
import styles from "./index.module.scss";
import clsx from "clsx";
import Image from "next/image";

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
				<header className={`${styles.header} text-center`}>
					<div className="container-md layout-column layout-align-center-center">
						<h1 className={`${styles.logo} serif strong`}>{this.props.type}</h1>
						<h2 className={`serif lh-2 mt-16 p ${styles.title}`}>
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
				<main className={`${styles.pageContent} container-lg p-0 layout-column`}>
					<div className="layout-row layout-wrap layout-align-center-center">
						{this.props.category.items.map((item) => {
							return (
								<div key={item.id} ref="article" className={`p-16 ${styles.column}`}>
										<Medium item={item} category={this.props.category}/>
									</div>
								)
							})
						 }
					</div>
				</main>
				<div className={styles.pageBg}>
					<Image
						objectFit="cover"
						quality="100"
						objectPosition="center"
						priority={true}
						loading="eager"
						layout="fill"
						src="/images/header-bg.jpg"
						alt="TiltShop header background"
					/>
				</div>
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
