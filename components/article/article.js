import React from 'react';
import article from './article.module.scss';
class Article extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			className: true,
			article: Object,
			onClick: Function,
			isHovered: false
		};
	}

	handleHover = () => {
		this.setState((prevState) => ({
			isHovered: !prevState.isHovered,
		}));
	}

	mountStyles = () => {
		this.setState({
			className: "fade-in-bottom speed-9",
		})
	}

	componentDidMount = () => {
		setTimeout(this.mountStyles,0);
	};

	render() {
		const hoverClass = this.state.isHovered ? "shadow-5" : "shadow-2";
		return (
			<article onClick={this.props.onClick} className={`${article.block} ${this.state.className}`}>
				<main onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} className={`layout-column layout-align-end-stretch  rounded-md ${article.shape} ${hoverClass} overflow-hidden cursor-pointer`}>
					<img className={article.img} src={this.props.article.imgSrc}></img>
					<div className={`p-32 layout-column layout-align-start-start ${article.content}`}>
						<span className="text-secondary-100 h5 mb-8 b">{this.props.article.title}</span>
						<span className="text-secondary-100 rounded-xs border border-secondary-100 py-4 px-8">{this.props.article.price}</span>
					</div>
				</main>
				<footer className="px-8 py-16 layout-column layout-align-start-start">
					<span className="b mb-8 p text-secondary-900 ">{this.props.article.motion}</span>
					<span className={`${article.tag} mb-12 text-secondary-900 small border border-secondary-900 py-4 px-12`}>{this.props.article.category}</span>
					<span className="text-secondary-700 small">{this.props.article.description}</span>
					<a className="u text-secondary-700 small">Read more</a>

				</footer>
			</article>
		);
	}
}

export {Article};