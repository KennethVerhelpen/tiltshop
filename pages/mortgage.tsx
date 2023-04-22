import { useState } from "react";

type LoanData = {
  interestRate: number;
  monthlyPayment: number;
  loanTerm: number;
  upfrontPayement: number;
}

const calculateLoan = (interestRate: LoanData['interestRate'], monthlyPayment: LoanData['monthlyPayment'], loanTerm: LoanData['loanTerm']) => {
  const monthlyInterestRate = interestRate / 12;
  const numPayments = loanTerm * 12;
  const loanAmount =
    (monthlyPayment *
      (1 - Math.pow(1 + monthlyInterestRate, -numPayments))) /
    monthlyInterestRate;
  return loanAmount.toFixed(2);
};

function CalculatorForm() {
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");

  const loadCalculator = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateLoan(parseFloat(interestRate), parseFloat(monthlyPayment), parseInt(loanPeriod));
    setResult(result);
  };

  const [result, setResult] = useState<string>();

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 bg-gray-100 rounded-md">
      <form onSubmit={loadCalculator} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="interest-rate" className="text-gray-700 font-semibold mb-2">{"Taux d'intérêt en pourcentage"}</label>
          <input
            type="number"
            id="interest-rate"
            name="interest-rate"
            className="border border-gray-400 p-2 rounded-md"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="monthly-payment" className="text-gray-700 font-semibold mb-2">Mensualité</label>
          <input
            type="number"
            id="monthly-payment"
            name="monthly-payment"
            className="border border-gray-400 p-2 rounded-md"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="loan-period" className="text-gray-700 font-semibold mb-2">{"Période d'emprunt"}</label>
          <select
            id="loan-period"
            name="loan-period"
            className="border border-gray-400 p-2 rounded-md"
            value={loanPeriod}
            onChange={(e) => setLoanPeriod(e.target.value)}
            required
          >
            <option value="">Choisir une période</option>
            <option value="15">15 ans</option>
            <option value="20">20 ans</option>
            <option value="25">25 ans</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Calculer
        </button>
      </form>
      {result && (
        <div className="mt-4">
          <p className="text-gray-700 font-semibold">
            Montant maximum empruntable : {result} euros
          </p>
        </div>
      )}
    </div>
  );
}

export default CalculatorForm;
