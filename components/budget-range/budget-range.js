import clsx from "clsx";

class BudgetRange extends React.Component {
  constructor(props) {
    super(props);
    this.amount = Number;
    this.className = String;
  }

  getSigns = (amount) => {
    if (amount <= 10) {
      return (<span>$</span>)
    } if (amount > 10 && amount < 100) {
      return (<span>$$</span>)
    } if (amount >= 100 && amount < 1000) {
      return (<span>$$$</span>)
    } if (amount >= 1000) {
      return (<span>$$$$</span>)
    } else null
  }

	render = () => {
		return (
			<span className={clsx(this.props.className)}>
        {this.getSigns(this.props.amount)}
			</span>
		);
	};
}

export {BudgetRange};