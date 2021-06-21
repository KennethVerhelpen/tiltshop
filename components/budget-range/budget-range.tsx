import clsx from "clsx";

export type BudgetProps = {
  amount: number;
  className: string;
}

export const BudgetRange = (props: BudgetProps) => {
  const { amount, className } = { ...props };

  const getSigns = (amount: number) => {
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

  return (
    <span className={clsx(className)}>
      {getSigns(amount)}
    </span>
  );
}