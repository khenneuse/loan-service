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

  private async submit(request: Request, response: Response) {
    const loanApplication = await getRepository(LoanApplication).findOne({
      where: { id: request.params['id'], deletedAt: IsNull() },
    });
    if (!loanApplication) {
      response.status(400).send(`No loan application with id ${request.params['id']}`);
      return;
    }
    response.send(makeLoanDecision(loanApplication));
  }

  private routes() {
    this.router.post('/:id/submit', this.submit);
  }
}
