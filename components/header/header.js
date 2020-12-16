import { Section, LogoWrapper, DefaultTitle, CustomTitle } from './header.styles';
import clsx from "clsx";
import Image from "next/image";
import { ArrowDownwardTwoTone } from '@material-ui/icons';
class Header extends React.Component {
	constructor(props) {
    super(props);
    this.className = null;
    this.title = undefined;
    this.category = undefined;
    this.medium = undefined;
    this.rotatingTexts = [ "cinema lovers", "tv shows addicts", "passionate gamers" ];
		this.state = { 
			visibleText: 0
		}
  }
  
  handleRotatingTextChange = () => {
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
			() => this.handleRotatingTextChange(),
			1500
		);
	}

	componentWillUnmount = () => {
		clearInterval(this.interval);
  }

	render = () => {
		return (
		  <Section className={clsx(this.props.className, "py-xs-128 text-center layout-column layout-align-center-center")}>
        <div className="pt-32 container-md layout-column layout-align-center-center flex">
          { this.props.title ? 
            <CustomTitle className="mt-16 mb-16 strong">{this.props.title}</CustomTitle>
            :
            <>
              <DefaultTitle className="hide-xs mt-16 mb-16 strong">
                <span>The best gifts for</span><br/>
                  { this.props.category ?
                    <span>{this.props.category}' lovers</span>
                  :
                  <span ref={this.rotatingTextsWrapper}>
                    {this.rotatingTexts.map((text, index) => (
                      <span className={clsx({ "hide": this.state.visibleText != index })} key={index}>{text}.</span>
                    ))}
                  </span>
                }
              </DefaultTitle>
              <DefaultTitle className="mt-16 mb-32 strong hide show-xs">The best gifts for cinema, tv & video games lovers.</DefaultTitle>
            </>
          }
          { this.props.category &&
            <h2 className="h6 mb-32">The best gifts for <b>{this.props.category}' lovers.</b></h2>
          }
          { this.props.medium &&
            <h2 className="h6 mb-32">The best gifts for <b>{this.props.medium}' fans.</b></h2>
          }
          {  !this.props.category && !this.props.medium &&
            <h2 className="h6 layout-row layout-column-xs layout-align-center-center"><span>Powered by</span>
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

export {Header};