import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import styled from '@emotion/styled';
class Medium extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mediumIndex: Number,
			item: Object,
			category: Object,
			count: Number,
			className: true,
			isHovered: false,
			onClick: Function
		};
	}

	handleHover = () => {
		this.setState((prevState) => ({
			isHovered: !prevState.isHovered,
		}));
	}

	 shouldComponentUpdate() {
    return false;
  }

	render() {

		const ImageWrapper = styled.div`
			opacity: 1;
			transition: all .6s ease-in-out;
		`

		const Content = styled.div`
			z-index: 2;
			transition: all .4s ease-in-out;

			span {
				color: white;
			}
		`

		const Shape = styled.div`
		  max-width: 20rem;
			width: 100%;
			height: 30rem;
			position: relative;
			border-radius: 16px;
			box-shadow: 6px 6px 20px 0 rgba(0, 0, 0, 0.35),
			20px 20px 8px 0 rgba(0, 0, 0, 0.08),
			5px 5px 7px 0 rgba(0, 0, 0, 0.09);
		
			&:hover {
				.image:last-child {
					opacity: 0;
					transition: all .3s ease-in-out;
				}

				.content {
					margin-bottom: 2rem;
					transition: all .3s ease-in-out;
				}
			}
		`

		const Title = styled.div`
			z-index: 3;
			color: white;
			letter-spacing: -0.5px;
			line-height: 2.375rem;
			letter-spacing: -0.7px;
			transition: text-shadow .2s ease-in-out;

      @media only screen and (max-width: 599px) {
        font-size: 3rem;
      }
		`

		return (
			<Link href={`${this.props.category.slug}/${this.props.item.slug}`}>
				<article className={clsx(this.props.className, "cursor-pointer")}>
					<Shape onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}
						className="cursor-pointer layout-column layout-align-end-center p-32 text-center overflow-hidden">
						<Content className="content layout-column layout-align-center-center">
							<Title className="h2 strong mb-8">{this.props.item.name}</Title>
							<span className="p bold text-capitalize">{this.props.category.type}</span>
							<span className="mt-8 small" style={{ opacity: 0.5 }}>See all articles</span>
						</Content>
						<ImageWrapper className="image">
							<Image
								quality="100"
								layout="fill"
								objectFit="cover"
								objectPosition="center"
								priority={this.props.mediumIndex <= 2}
								loading={this.props.mediumIndex <= 2 ? "eager" : "lazy"}
								src={`/images/medium/${this.props.item.slug}/thumbnail-hover.jpg`}
								alt={this.props.item.imgAlt}
							/>
						</ImageWrapper>
						<ImageWrapper className="image">
							<Image
								quality="100"
								layout="fill"
								objectFit="cover"
								objectPosition="center"
								priority={this.props.mediumIndex <= 2}
								loading={this.props.mediumIndex <= 2 ? "eager" : "lazy"}
								src={`/images/medium/${this.props.item.slug}/thumbnail.jpg`}
								alt={this.props.item.imgAlt}
							/>
						</ImageWrapper>
					</Shape>
				</article>
			</Link>
		);
	}
}

export { Medium };