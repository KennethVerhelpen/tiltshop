import { Page, Medium } from '../components/index';
import mediaSet from "../lib/media";
import index from "./index.module.scss";
import clsx from "clsx";

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.rotatingTextsWrapper = React.createRef();
		this.rotatingTexts = ["movie lovers", "tv shows addicts", "passionate gamers"];
		this.state = {
			media: undefined,
			activeMedia: null,
			visibleText: 0
		}
	}

	handleMediaSetChange = (index) => {
		this.setState({
			media: index ? mediaSet[index] : undefined,
			activeMedia: index,
		})
	}

	handleChange = () => {
		if ((this.state.visibleText + 1) === this.rotatingTexts.length) {
			this.setState({
				visibleText: 0
			});
		} else {
			this.setState({
				visibleText: this.state.visibleText + 1
			});
		}
	};

	componentDidMount() {
		this.interval = setInterval(
			() => this.handleChange(),
			1500
		);
	}

	componentWillUnmount = () => {
		clearInterval(this.interval);
	}

	render = () => {

		return (
			<Page activeMedia={this.props.activeMedia} media={mediaSet} onClick={this.handleMediaSetChange}>
				<header className={`${index.header} text-center`}>
					<div className="container-md layout-column layout-align-center-center">
						<h1 className={`${index.logo} serif strong`}>TiltShop</h1>
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
						{(this.state.media === undefined)
							? mediaSet.map((medium => medium.items && medium.items.map((item, index) => {
								return (
									<div key={item.id} ref="article" className="p-16">
										<Medium key={index} item={item} medium={medium}/>
									</div>
								)
						})))
							: this.state.media != undefined && this.state.media.items.map((item, index) => {
								return (
									<div key={item.id} ref="article" className="p-16">
										<Medium key={index} item={item} medium={this.state.media}/>
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

export default Home
