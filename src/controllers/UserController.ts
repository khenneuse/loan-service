import { Request, Response, Router } from 'express';
import { getRepository, IsNull } from 'typeorm';
import { inspect } from 'util';
import { v4 as uuidV4 } from 'uuid';
import { LoanApplication } from '../entity/LoanApplication';
import { User } from '../entity/User';
import { makeLoanDecision } from '../lib/LoanDecider';

export class UserController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private async createUser(request: Request, response: Response) {
    const { id, name } = request.body;
    const result = await getRepository(User).save({
      id: id || uuidV4(),
      name,
    });
    console.log(`User created ${inspect(result)}`);
    response.send(result);
  }

  private async getAllUsers(_request: Request, response: Response) {
    const allUsers = await getRepository(User).find();
    response.send(allUsers);
  }

  private async getUser(request: Request, response: Response) {
    const { id } = request.params;
    const user = await getRepository(User).findOne(id);

    if (!user) {
      response.status(400).send(`No user exists with id: ${id}`);
      return;
    }
    response.send(user);
  }

  private async createLoanApplication(request: Request, response: Response) {
    const { userId } = request.params;
    const user = await getRepository(User).findOne(userId);
    if (!user) {
      response.status(400).send(`No user exists with id: ${userId}`);
    }
    const existingApplication = await getRepository(LoanApplication).findOne({
      where: { userId, deletedAt: IsNull() },
    });
    if (existingApplication) {
      response.status(400).send('User already has a loan application in progress');
      return;
    }
    const {
      creditScore, monthlyDebt, monthlyIncome,
      bankruptcies, delinquencies,
      vehicleValue, loanAmount,
    } = request.body;
    const loanApplication = await getRepository(LoanApplication).save({
      id: uuidV4(),
      userId: userId!,
      creditScore,
      monthlyDebt,
      monthlyIncome,
      bankruptcies,
      delinquencies,
      vehicleValue,
      loanAmount,
    });
    console.log(`Loan application created for user: ${userId}`);
    response.send(loanApplication);
  }

  private async submitApplication(request: Request, response: Response) {
    const loanApplication = await getRepository(LoanApplication).findOne({
      where: { userId: request.params['id'], deletedAt: IsNull() },
    });
    if (!loanApplication) {
      response.status(400).send(`No loan application for user id ${request.params['id']}`);
      return;
    }
    response.send(makeLoanDecision(loanApplication));
  }

  private routes() {
    this.router.get('/', this.getAllUsers);
    this.router.post('/', this.createUser);
    this.router.get('/:id', this.getUser);
    this.router.post('/:userId/applications', this.createLoanApplication);
    this.router.post('/:id/application/submit', this.submitApplication);
  }
}
