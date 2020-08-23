import Page from '../components/page/page';
import Article from "../components/article/article";
import Modal from "../components/modal/modal";
import Sidebar from "../components/sidebar/sidebar";
import FilterListRounded from "@material-ui/icons/FilterListRounded";

import Select from "react-select";

import items from "../lib/items";

import index from "./index.module.scss";
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.toolbar = React.createRef();
		this.state = {
			showModal: false,
			showSidebar: false,
			articles: items,
			selectedIndex: null,
			raised: false,
			visibleMotion: "All"
		};
	}

	componentDidMount = () => {
		window.addEventListener("scroll", this.handleRaise, true);
	};

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleRaise, false);
	}

	toggleModal = (event) => {
		this.setState({
			selectedIndex: event,
			showModal: !this.state.showModal,
		});
	};

	handleRaise = () => {
		const toolbarTop = this.toolbar.current.getBoundingClientRect().top;
		const threshold = 0;
		if (threshold === toolbarTop) {
			this.setState({ raised: true });
		} else if (toolbarTop > 56) {
			this.setState({ raised: false });
		}
	};

	onChangeMotions = (option) => {
		this.setState({
			visibleMotion: option.value,
		})
	}

	toggleSidebar = (event) => {
		if (!this.state.showSidebar) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "visible";
		}
		this.setState((prevState) => {
			return {
				selectedIndex: event,
				showSidebar: !prevState.showSidebar
			}
		});
	};

	getOptions = (items, type) => {
		const allItems = items.map((item) => {
			return item[type];
		});
		const uniqueItems = allItems.filter(function onlyUnique(value, index, self) {
			return self.indexOf(value) === index;
		})
		const options = uniqueItems.map((option, index) => {
			return ({ label: option, value: option });
		}); return options;
	}

	render = () => {

		// const optionsMotions = (this.getFilteredLabels(this.state.articles, "motion"));
		const options = [
			{ label: "All", value: "All" },
			{ label: "Stranger Things", value: "Stranger Things" },
			{ label: "Denver, the Last Dinosaur", value: "Denver, the Last Dinosaur" },
		]
		console.log("MOTION", this.state.visibleMotion)
		console.log("Articles", this.state.articles)

		return (
			<Page className={index.content}>
				<header className={`${index.header} text-center`}>
					<div className="container-md layout-column layout-align-center-center">
						<h2 className={`logo-serif ${index.logotype} b`}>Tilt</h2>
						<h1 className={`mt-16 h4 lh-3 serif text-secondary-900 ${index.title}`}>
							A currated list of items for
							<br /><mark>cinema lovers</mark>.
						</h1>
					</div>
				</header>
				<div ref={this.toolbar} className={`${this.state.raised ? "shadow-2" : ""} ${index.filtersBar} bg-secondary-100 layout-row layout-align-start-stretch`}>
					<div className="container-md layout-row px-24 layout-align-space-between-center">
						<p className={`${this.state.raised ? "fade-in-top speed-6" : ""} logo-serif b h5 ${index.filtersBarLogo}`}>Tilt</p>
						<div className="flex layout-row layout-align-end-center hide-xs">
							<Select
								onChange={this.onChangeMotions}
								className={`${index.select} px-8`}
								placeholder="Filter by movie"
								options={options}
							/>
						</div>
						<div className="flex layout-row layout-align-end-center hide show-xs">
							<button className="btn text-secondary-900">
								<FilterListRounded />
							</button>
						</div>
					</div>
				</div>
				<main className="container-md layout-column">
					<div className="layout-row layout-wrap">
						{ this.state.visibleMotion === "All" ?
							this.state.articles.map((article, index) => {
								return (
									<div key={article.id} ref="article" className="flex-100 flex-sm-50 flex-gt-sm-33 p-16">
										<Article article={article} onClick={() => this.toggleSidebar(index)}></Article>
									</div>
								)})
						:
						this.state.articles
							.filter(article => article.motion === this.state.visibleMotion)
							.map((article, index) => {
							return (
								<div key={article.id} ref="article" className="flex-100 flex-sm-50 flex-gt-sm-33 p-16">
									<Article article={article} onClick={() => this.toggleSidebar(index)}></Article>
								</div>
							);})
						}
					</div>
				</main>
				<Sidebar
					article={this.state.articles[this.state.selectedIndex]}
					onClick={() => this.toggleSidebar()}
					isOpen={this.state.showSidebar}
				></Sidebar>
				<Modal
					article={this.state.articles[this.state.selectedIndex]}
					onClick={() => this.toggleModal()}
					isOpen={this.state.showModal}
				></Modal>
			</Page>
		);
	};
}

export default Home;