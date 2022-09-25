/* eslint-disable @typescript-eslint/no-use-before-define */
import { getRepository, IsNull } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { LoanApplication } from '../entities/LoanApplication';

export interface LoanApplicationParameters {
  creditScore: number;
  monthlyDebt: number;
  monthlyIncome: number;
  bankruptcies: number;
  delinquencies: number;
  vehicleValue: number;
  loanAmount: number;
}

export async function createLoanApplication(
  userId: string,
  application: LoanApplicationParameters,
): Promise<LoanApplication> {
  return getRepository(LoanApplication).save({
    id: uuidV4(),
    userId,
    ...application,
  });
}

export async function deleteLoanApplication(id: string): Promise<boolean> {
  const loanApplication = await getLoanApplicationById(id);
  if (!loanApplication) {
    return false;
  }

  const deletedApplication = await getRepository(LoanApplication).softRemove(loanApplication);
  return deletedApplication.id === id && deletedApplication.deletedAt != null;
}

export async function deleteLoanApplicationByUserId(userId: string) {
  const loanApplication = await getLoanApplicationByUserId(userId);
  if (!loanApplication) {
    return false;
  }

  const deletedApplication = await getRepository(LoanApplication).softRemove(loanApplication);
  return deletedApplication.id === loanApplication.id && deletedApplication.deletedAt != null;
}

export async function getLoanApplicationById(id:string): Promise<LoanApplication | undefined> {
  return getRepository(LoanApplication).findOne({
    where: { id, deletedAt: IsNull() },
  });
}

export async function getLoanApplicationByUserId(
  userId: string,
): Promise<LoanApplication | undefined> {
  return getRepository(LoanApplication).findOne({
    where: { userId, deletedAt: IsNull() },
  });
}

export async function updateLoanApplication(
  loanApplication: LoanApplication,
  updatedFields: Partial<LoanApplicationParameters>,
): Promise<LoanApplication> {
  // Get only modified values
  Object.keys(updatedFields).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-param-reassign
    (updatedFields as any)[key] === undefined ? delete (updatedFields as any)[key] : {};
  });
  return getRepository(LoanApplication).save({
    ...loanApplication,
    ...updatedFields,
  });
}
