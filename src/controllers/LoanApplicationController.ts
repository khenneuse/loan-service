import { Request, Response, Router } from 'express';
import { getRepository, IsNull } from 'typeorm';
import { LoanApplication } from '../entity/LoanApplication';
import { makeLoanDecision } from '../lib/LoanDecider';

export class LoanApplicationController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private async delete(request: Request, response: Response) {
    const { id } = request.params;
    const loanApplication = await getRepository(LoanApplication).findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!loanApplication) {
      response.status(400).send(`No loan application with id ${id}`);
      return;
    }
    await getRepository(LoanApplication).softRemove(loanApplication);
    response.send(`Loan application ${id} was deleted`);
  }

  private async submit(request: Request, response: Response) {
    const { id } = request.params;
    const loanApplication = await getRepository(LoanApplication).findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!loanApplication) {
      response.status(400).send(`No loan application with id ${id}`);
      return;
    }
    response.send(makeLoanDecision(loanApplication));
  }

  private async update(request: Request, response: Response) {
    const { id } = request.params;
    const loanApplication = await getRepository(LoanApplication).findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!loanApplication) {
      response.status(400).send(`No loan application with id ${id}`);
      return;
    }
    const {
      creditScore, monthlyDebt, monthlyIncome,
      bankruptcies, delinquencies,
      vehicleValue, loanAmount,
    } = request.body;
    const updatedFields = {
      creditScore,
      monthlyDebt,
      monthlyIncome,
      bankruptcies,
      delinquencies,
      vehicleValue,
      loanAmount,
    };

    // Get only modified values
    Object.keys(updatedFields).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (updatedFields as any)[key] === undefined ? delete (updatedFields as any)[key] : {};
    });
    const updatedLoanApplication = await getRepository(LoanApplication).save({
      ...loanApplication,
      ...updatedFields,
    });
    response.send(updatedLoanApplication);
  }

  private routes() {
    this.router.delete('/:id', this.delete);
    this.router.patch('/:id', this.update);
    this.router.post('/:id/submit', this.submit);
  }
}
