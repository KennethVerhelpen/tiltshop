import clsx from "clsx";
import { ActiveStar, ActiveStarHalf, InactiveStar } from "./ratings.styles";

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.rate = Number;
    this.className = String;
  }

  getPlainStars = (rate) => {
    return Math.floor(rate);
  }

  isHalfStar = (rate) => {
    return ((Math.floor(rate * 2) / 2).toFixed(1) - this.getPlainStars(rate)) > 0;
  }
    
  getEmptyStars = (rate) => {
    return Math.floor(5 - rate);
  }

	render = () => {
		return (
      <div className={clsx(this.props.className, "layout-row")}>
        {Array.from(Array(this.getPlainStars(this.props.rate)), (number, index) => (
            <ActiveStar key={index} style={{ fontSize: 16 }}/>
        ))}
        {this.isHalfStar(this.props.rate) && <ActiveStarHalf style={{ fontSize: 16 }}/>}
        {Array.from(Array(this.getEmptyStars(this.props.rate)), (number, index) => (
            <InactiveStar className="text-secondary-500" key={index} style={{ fontSize: 16 }}/>
        ))} 
      </div>
		);
	};
}

export {Ratings};
            
           