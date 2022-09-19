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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function makeLoanDecision(_loanApplication: LoanApplication): LoanDecision {
  return {
    accepted: false,
    reasons: ['Low Credit Score'],
  };
}
