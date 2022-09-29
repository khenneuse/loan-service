/* eslint-disable @typescript-eslint/no-use-before-define */
import { getRepository, IsNull } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { LoanApplication as LoanApplicationEntity } from '../entities/LoanApplication';
import { LoanApplicationDTO } from './dtos';

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
  parameters: LoanApplicationParameters,
): Promise<LoanApplicationDTO> {
  const application = await getRepository(LoanApplicationEntity).save({
    id: uuidV4(),
    userId,
    ...parameters,
  });
  return convertToLoanApplicationDTO(application);
}

export async function deleteLoanApplication(id: string): Promise<boolean> {
  const loanApplication = await getLoanApplicationById(id);
  if (!loanApplication) {
    return false;
  }

  const deletedApplication = await getRepository(LoanApplicationEntity).softRemove(loanApplication);
  return deletedApplication.id === id && deletedApplication.deletedAt != null;
}

export async function deleteLoanApplicationByUserId(userId: string) {
  const loanApplication = await getLoanApplicationByUserId(userId);
  if (!loanApplication) {
    return false;
  }

  const deletedApplication = await getRepository(LoanApplicationEntity).softRemove(loanApplication);
  return deletedApplication.id === loanApplication.id && deletedApplication.deletedAt != null;
}

export async function getLoanApplicationById(id:string): Promise<LoanApplicationDTO | null> {
  const loanApplication = await getRepository(LoanApplicationEntity).findOne({
    where: { id, deletedAt: IsNull() },
  });
  return loanApplication ? convertToLoanApplicationDTO(loanApplication) : null;
}

export async function getLoanApplicationByUserId(
  userId: string,
): Promise<LoanApplicationDTO | null> {
  const loanApplication = await getRepository(LoanApplicationEntity).findOne({
    where: { userId, deletedAt: IsNull() },
  });
  return loanApplication ? convertToLoanApplicationDTO(loanApplication) : null;
}

export async function updateLoanApplication(
  loanApplication: LoanApplicationDTO,
  updatedFields: Partial<LoanApplicationParameters>,
): Promise<LoanApplicationDTO> {
  // Get only modified values
  Object.keys(updatedFields).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-param-reassign
    (updatedFields as any)[key] === undefined ? delete (updatedFields as any)[key] : {};
  });
  const savedLoanApplication = await getRepository(LoanApplicationEntity).save({
    ...loanApplication,
    ...updatedFields,
  });
  return convertToLoanApplicationDTO(savedLoanApplication);
}

function convertToLoanApplicationDTO(entity: LoanApplicationEntity): LoanApplicationDTO {
  return {
    id: entity.id,
    userId: entity.userId,
    creditScore: entity.creditScore,
    monthlyDebt: entity.monthlyDebt,
    monthlyIncome: entity.monthlyIncome,
    bankruptcies: entity.bankruptcies,
    delinquencies: entity.delinquencies,
    vehicleValue: entity.vehicleValue,
    loanAmount: entity.loanAmount,
  };
}
