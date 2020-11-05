import React from 'react';
import medium from './medium.module.scss';

class Medium extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			medium: Object,
			count: Number,
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
			<article onClick={this.props.onClick} className={`${medium.block} ${this.state.className}`}>
				<main onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} className={`layout-column layout-align-center-center p-32 text-center rounded-md ${medium.shape} ${hoverClass} overflow-hidden cursor-pointer`}>
					<span className={`h1 serif b ${medium.name}`}>{this.props.medium.name}</span>
					<img className={medium.img} src={this.props.medium.imgSrc} alt={this.props.medium.imgSrc}></img>
				</main>
			</article>
		);
	}
}

export { Medium };