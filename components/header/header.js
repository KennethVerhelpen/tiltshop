import { Section, DefaultTitle, CustomTitle } from './header.styles';
import clsx from "clsx";
class Header extends React.Component {
	constructor(props) {
    super(props);
    this.className = String;
    this.title = String;
    this.category = String;
    this.medium = String;
    this.subtitle = String;
    this.rotation = Boolean;
    this.rotatingTexts = Array;
		this.state = { 
      visibleText: 0,
		}
  }
  
  handleRotatingTextChange = () => {
    const { rotatingTexts } = this.props;

		if ((this.state.visibleText + 1) === rotatingTexts.length) {
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
    const { className, title, category, medium, subtitle, rotatingTexts } = this.props;

		return (
		  <Section className={clsx(className, "pt-xs-128 pb-xs-32 text-center layout-column layout-align-center-center")}>
        <div className="pt-32 container-md layout-column layout-align-center-center flex">
          { title ? 
            <CustomTitle className="scale-in speed-10 mt-16 mb-16 strong" >{title}</CustomTitle>
            :
            <>
              <DefaultTitle className="scale-in speed-10 hide-xs mt-16 mb-16 strong"> 
                <span>The best items for</span><br/>
                  { category ?
                    <span>{category} lovers</span>
                  :
                  <span>
                    {rotatingTexts.map((text, index) => (
                      <span className={clsx({ "hide": this.state.visibleText != index })} key={index}>{text}.</span>
                    ))}
                  </span>
                }
              </DefaultTitle>
              <DefaultTitle className="scale-in speed-10 mt-16 mb-32 strong hide show-xs">The best items for cinema, tv & video game lovers.</DefaultTitle>
            </>
          }
          { medium &&
            <h2 className="h6 fade-in-bottom speed-5">The best items for <b>{medium} fans</b> in <b>{new Date().getFullYear()}</b>.</h2>
          }
          { subtitle &&
            <h2 className="h6 fade-in-bottom speed-5">{subtitle}</h2>
          }
          { !medium && !subtitle &&
            <h2 className="fade-in-bottom speed-5 h6 layout-row layout-column-xs layout-align-center-center">A list of great products hand-picked just for you.</h2>
          }
        </div>
      </Section>
		);
	};
}

Header.defaultProps = {
  rotation: false,
	rotatingTexts: [ "cinema lovers", "tv show addicts", "passionate gamers" ]
}

export {Header};