/* eslint-disable @typescript-eslint/no-use-before-define */
import { pmt } from 'financial';
import { LoanApplication } from '../entity/LoanApplication';

export type LoanDecision = LoanAccept | LoanReject;
export interface LoanAccept {
  accepted: true;
  apr: number;
  monthlyPayment: number;
  termLengthMonths: number;
}

export interface LoanReject {
  accepted: false;
  reasons: string[];
}

const TERM_LENGTH_MONTHS = 72;
const ALLOWED_DEBT = 0.60; // 60%

export function makeLoanDecision(loanApplication: LoanApplication): LoanDecision {
  const {
    creditScore, monthlyDebt, monthlyIncome, loanAmount,
  } = loanApplication;
  const rejectionReasons: string[] = getInitialRejectionReasonIfAny(loanApplication);

  if (rejectionReasons.length > 0) {
    return buildRejections(rejectionReasons);
  }
  const apr = getAPRForCreditScore(creditScore);
  const monthlyPayment = calculateMonthlyPaymentForLoan(
    TERM_LENGTH_MONTHS,
    apr,
    loanAmount,
  );

  if (exceedsDebtToIncomeRatio(monthlyDebt, monthlyIncome, monthlyPayment)) {
    return buildRejections(['Debt-to-income ratio exceeds 60%']);
  }
  return buildAcceptance(0.10);
}

function getInitialRejectionReasonIfAny(loanApplication: LoanApplication): string [] {
  const reasons: string[] = [];
  if (loanApplication.creditScore < 660) {
    reasons.push('Low Credit Score');
  }
  if (loanApplication.bankruptcies > 0) {
    reasons.push('Bankruptcy reported');
  }
  if (loanApplication.delinquencies > 1) {
    reasons.push('Delinquency threshold exceeded');
  }
  if (loanApplication.loanAmount > loanApplication.vehicleValue) {
    reasons.push('Loan-to-value ratio exceeds 100%');
  }
  return reasons;
}

function buildRejections(reasons: string[]): LoanReject {
  return { accepted: false, reasons };
}

function buildAcceptance(apr: number): LoanAccept {
  return {
    accepted: true,
    apr,
    monthlyPayment: 100,
    termLengthMonths: 72,
  };
}

function getAPRForCreditScore(creditScore: number) {
  let apr: number | undefined;
  if (creditScore > 779) {
    apr = 0.02;
  } else if (creditScore > 719) {
    apr = 0.05;
  } else if (creditScore > 659) {
    apr = 0.08;
  }

  if (!apr) {
    throw Error('Loan declined for credit score below 660');
  }

  return apr;
}

function calculateMonthlyPaymentForLoan(termLengthMonths: number, apr: number, loanAmount: number) {
  const monthsInYear = 12;
  // We have an _annual_ percentage rate that needs to be broken up by months.
  // This is why we divide the APR by 12 months. We then get monthly percentage
  // rate.
  const paymentAmountRaw = pmt(apr / monthsInYear, termLengthMonths, loanAmount);

  // The payment is a negative amount because it reducing the overall loan
  // amount with each payment.  We flip it so that we can work with it as value
  // that will be added to the monthly debt of the application
  return roundToCents(paymentAmountRaw * -1);
}

function exceedsDebtToIncomeRatio(
  monthlyDebt: number,
  monthlyIncome: number,
  monthlyPayment: number,
) {
  const newMonthlyDebt = monthlyDebt + monthlyPayment;
  const allowableMonthlyDebt = roundToCents(monthlyIncome * ALLOWED_DEBT);

  console.log(`exceedsDebtToIncomeRatio: ${JSON.stringify({ monthlyPayment, newMonthlyDebt, allowableMonthlyDebt })}`);
  return newMonthlyDebt > allowableMonthlyDebt;
}

function roundToCents(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export const forUnitTestingOnly = {
  getAPRForCreditScore,
};
