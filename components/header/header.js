import { Section, LogoWrapper, DefaultTitle, CustomTitle } from './header.styles';
import clsx from "clsx";
import Image from "next/image";
class Header extends React.Component {
	constructor(props) {
    super(props);
    this.className = null;
    this.title = String;
    this.category = String;
    this.medium = String;
    this.rotation = Boolean;
    this.subtitle = String;
    this.rotatingTexts = Array;
		this.state = { 
      visibleText: 0,
		}
  }
  
  handleRotatingTextChange = () => {
		if ((this.state.visibleText + 1) === this.props.rotatingTexts.length) {
			this.setState({
				visibleText: 0
			});
		} else {
			this.setState({
				visibleText: this.state.visibleText + 1
			});
		}
	};

	componentDidMount = () => {
    if (this.props.rotation) {
      this.interval = setInterval(
        () => this.handleRotatingTextChange(),
        1500
      );
    }
  }

	componentWillUnmount() {
		clearInterval(this.interval);
  }

	render = () => {
		return (
		  <Section className={clsx(this.props.className, "py-xs-128 text-center layout-column layout-align-center-center")}>
        <div className="pt-32 container-md layout-column layout-align-center-center flex">
          { this.props.title ? 
            <CustomTitle className={clsx(this.state.reveal, "mt-16 mb-16 strong")} >{this.props.title}</CustomTitle>
            :
            <>
              <DefaultTitle className={clsx(this.state.reveal, "hide-xs mt-16 mb-16 strong")}>
                <span>The best items for</span><br/>
                  { this.props.category ?
                    <span>{this.props.category}' lovers</span>
                  :
                  <span>
                    {this.props.rotatingTexts.map((text, index) => (
                      <span className={clsx({ "hide": this.state.visibleText != index })} key={index}>{text}.</span>
                    ))}
                  </span>
                }
              </DefaultTitle>
              <DefaultTitle className={clsx(this.state.reveal, "mt-16 mb-32 strong hide show-xs")}>The best items for cinema, tv & video games lovers.</DefaultTitle>
            </>
          }
          { this.props.medium &&
            <h2 className="h6 mb-32 fade-in-bottom speed-5">The best items for <b>{this.props.medium}' fans.</b></h2>
          }
          { this.props.subtitle &&
            <h2 className="h6 mb-32 fade-in-bottom speed-5">{this.props.subtitle}</h2>
          }
          { !this.props.medium && !this.props.subtitle &&
            <h2 className="fade-in-bottom speed-5 h6 layout-row layout-column-xs layout-align-center-center"><span>Powered by</span>
              <LogoWrapper className="display-inline-block">
                <Image
                  width="80"
                  height="20"
                  src="/images/logos/amazon.svg"
                  quality="100"
                  priority={true}
                  loading="eager"
                  alt="Amazon logo"
                  />
                </LogoWrapper></h2>
          }
        </div>
      </Section>
		);
	};
}

Header.defaultProps = {
  roation: false,
	rotatingTexts: [ "cinema lovers", "tv shows addicts", "passionate gamers" ]
}

export {Header};