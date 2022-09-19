import { Request, Response, Router } from 'express';
import { getRepository, IsNull } from 'typeorm';
import { LoanApplication } from '../entity/LoanApplication';
import { User } from '../entity/User';

export class UserController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private async getAllUsers(_request: Request, response: Response) {
    const allUsers = await getRepository(User).find();
    response.send(allUsers);
  }

  private async submitApplication(request: Request, response: Response) {
    const loanApplication = await getRepository(LoanApplication).findOne({
      where: { userId: request.params['id'], deletedAt: IsNull() },
    });
    if (!loanApplication) {
      response.status(400).send(`No loan application for user id ${request.params['id']}`);
      return;
    }
    response.send(`Found loan application for user`);
  }

  private routes() {
    this.router.get('/', this.getAllUsers);
    this.router.post('/:id/application/submit', this.submitApplication);
  }
}
