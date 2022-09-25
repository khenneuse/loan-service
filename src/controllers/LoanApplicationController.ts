/* eslint-disable no-underscore-dangle */
import { Request, Response, Router } from 'express';
import * as loanApplicationService from '../services/LoanApplicationService';
import { makeLoanDecision } from '../lib/LoanDecider';

export class LoanApplicationController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private async _delete(request: Request, response: Response) {
    const { id } = request.params;
    if (!id) {
      response.status(400).send('Id is required to delete a loan application');
      return;
    }
    const deleted = loanApplicationService.deleteLoanApplication(id);
    response.send(`Loan application ${id} was deleted: ${deleted}`);
  }

  private async _submit(request: Request, response: Response) {
    const { id } = request.params;
    if (!id) {
      response.status(400).send('Id is required to submit a loan application');
      return;
    }
    const loanApplication = await loanApplicationService.getLoanApplicationById(id);
    if (!loanApplication) {
      response.status(400).send(`No loan application with id ${id}`);
      return;
    }
    response.send(makeLoanDecision(loanApplication));
  }

  private async _update(request: Request, response: Response) {
    const { id } = request.params;
    if (!id) {
      response.status(400).send('Id is required to update a loan application');
      return;
    }
    const loanApplication = await loanApplicationService.getLoanApplicationById(id);
    if (!loanApplication) {
      response.status(400).send(`No loan application with id ${id}`);
      return;
    }
    const {
      creditScore, monthlyDebt, monthlyIncome,
      bankruptcies, delinquencies,
      vehicleValue, loanAmount,
    } = request.body;

    const updatedLoanApplication = loanApplicationService.updateLoanApplication(
      loanApplication,
      {
        creditScore,
        monthlyDebt,
        monthlyIncome,
        bankruptcies,
        delinquencies,
        vehicleValue,
        loanAmount,
      },
    );
    response.send(updatedLoanApplication);
  }

  private routes() {
    this.router.delete('/:id', this._delete);
    this.router.patch('/:id', this._update);
    this.router.post('/:id/submit', this._submit);
  }
}
