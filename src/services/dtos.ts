export interface UserDTO {
  id: string;
  name: string;
}

export interface LoanApplicationDTO {
  id: string;
  userId: string;
  creditScore: number;
  monthlyDebt: number;
  monthlyIncome: number;
  bankruptcies: number;
  delinquencies: number;
  vehicleValue: number;
  loanAmount: number;
}
