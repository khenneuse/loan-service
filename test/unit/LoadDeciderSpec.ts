import { LoanApplication } from '../../src/entity/LoanApplication';
import { makeLoanDecision, forUnitTestingOnly } from '../../src/lib/LoanDecider';

describe('LoanDecider', () => {
  describe('makeLoanDecision', () => {
    let loanApplication: LoanApplication;

    beforeEach(() => {
      loanApplication = {
        id: 'loan-application-id',
        userId: 'user-id',
        creditScore: 802,
        monthlyDebt: 1_000.00,
        monthlyIncome: 20_000.00,
        bankruptcies: 0,
        delinquencies: 0,
        vehicleValue: 45_000.00,
        loanAmount: 25_000.00,
      } as LoanApplication;
    });

    describe.skip('loan acceptance cases', () => {
      it('low APR', () => {
        const decision = makeLoanDecision(loanApplication);
        expect(decision).toEqual({
          accepted: true,
          apr: 0.02,
          monthlyPayment: 320.00,
          termLengthMonths: 72,
        });
      });

      it('one delinquency', () => {

      });
    });

    describe('loan rejection cases', () => {
      it('low credit score', () => {
        const decision = makeLoanDecision({ ...loanApplication, creditScore: 659 });
        expect(decision).toEqual({
          accepted: false,
          reasons: ['Low Credit Score'],
        });
      });

      it('bankruptcies', () => {
        const decision = makeLoanDecision({ ...loanApplication, bankruptcies: 1 });
        expect(decision).toEqual({
          accepted: false,
          reasons: ['Bankruptcy reported'],
        });
      });

      it('more than one delinquency', () => {
        const decision = makeLoanDecision({ ...loanApplication, delinquencies: 2 });
        expect(decision).toEqual({
          accepted: false,
          reasons: ['Delinquency threshold exceeded'],
        });
      });

      it('Debt-to-income ratio above 60%', () => {
        const decision = makeLoanDecision({
          ...loanApplication,
          creditScore: 755,
          loanAmount: 10_000,
          monthlyDebt: 5_000,
          monthlyIncome: 100_000 / 12,
        });
        expect(decision).toEqual({
          accepted: false,
          reasons: ['Debt-to-income ratio exceeds 60%'],
        });
      });

      it('Loan-to-value ratio exceeds 100%', () => {
        const decision = makeLoanDecision({
          ...loanApplication,
          vehicleValue: 1_000.00,
          loanAmount: 1_000.01,
        });
        expect(decision).toEqual({
          accepted: false,
          reasons: ['Loan-to-value ratio exceeds 100%'],
        });
      });

      it('returns multiple reasons', () => {
        const decision = makeLoanDecision({
          ...loanApplication,
          bankruptcies: 1,
          delinquencies: 2,
        });
        expect(decision).toEqual({
          accepted: false,
          reasons: ['Bankruptcy reported', 'Delinquency threshold exceeded'],
        });
      });
    });
  });

  describe('getAPRForCreditScore', () => {
    it('returns 2.0% for a score >= 780', () => {
      expect(forUnitTestingOnly.getAPRForCreditScore(780)).toEqual(0.02);
    });

    it('returns 5.0% for a score between 720 and 779', () => {
      expect(forUnitTestingOnly.getAPRForCreditScore(720)).toEqual(0.05);
      expect(forUnitTestingOnly.getAPRForCreditScore(779)).toEqual(0.05);
    });

    it('returns 8.0% for a score between 660 and 719', () => {
      expect(forUnitTestingOnly.getAPRForCreditScore(660)).toEqual(0.08);
      expect(forUnitTestingOnly.getAPRForCreditScore(719)).toEqual(0.08);
    });

    it('throws error for a score < 660', () => {
      expect(() => {
        forUnitTestingOnly.getAPRForCreditScore(659);
      }).toThrowError();
    });
  });
});
