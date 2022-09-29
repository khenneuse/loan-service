/* eslint-disable no-underscore-dangle */
import { Request, Response, Router } from 'express';
import * as loanApplicationService from '../services/LoanApplicationService';
import * as userService from '../services/UserService';
import { makeLoanDecision } from '../lib/LoanDecider';

export class UserController {
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
    const deleted = loanApplicationService.deleteLoanApplicationByUserId(id);
    response.send(`Loan application for userId ${id} was deleted: ${deleted}`);
  }

  private async _createUser(request: Request, response: Response) {
    const { id, name } = request.body;
    const result = await userService.createUser(name, id);
    response.send(result);
  }

  private async _getAllUsers(_request: Request, response: Response) {
    const allUsers = await userService.getAllUsers();
    response.send(allUsers);
  }

  private async _getUser(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) {
      response.status(400).send('Id is required to look up the user');
      return;
    }

    const user = await userService.getUser(id);

    if (!user) {
      response.status(400).send(`No user exists with id: ${id}`);
      return;
    }
    response.send(user);
  }

  private async _createLoanApplication(request: Request, response: Response) {
    const { userId } = request.params;

    if (!userId) {
      response.status(400).send('UserId is required to create a loan application');
      return;
    }
    const user = await userService.getUser(userId);
    if (!user) {
      response.status(400).send(`No user exists with id: ${userId}`);
    }

    const existingApplication = await loanApplicationService.getLoanApplicationByUserId(userId);
    if (existingApplication) {
      response.status(400).send('User already has a loan application in progress');
      return;
    }
    const {
      creditScore, monthlyDebt, monthlyIncome,
      bankruptcies, delinquencies,
      vehicleValue, loanAmount,
    } = request.body;
    const loanApplication = loanApplicationService.createLoanApplication(userId, {
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

  private async _submitLoanApplication(request: Request, response: Response) {
    const { id: userId } = request.params;

    if (!userId) {
      response.status(400).send('UserId is required for submitting a loan application');
      return;
    }
    const loanApplication = await loanApplicationService.getLoanApplicationByUserId(userId);

    if (!loanApplication) {
      response.status(400).send(`No loan application for user id ${request.params['id']}`);
      return;
    }
    response.send(makeLoanDecision(loanApplication));
  }

  private async _updateLoanApplication(request: Request, response: Response) {
    const { id } = request.params;
    if (!id) {
      response.status(400).send('User Id is required to update a loan application');
      return;
    }
    const loanApplication = await loanApplicationService.getLoanApplicationByUserId(id);
    if (!loanApplication) {
      response.status(400).send(`No loan application for userId ${id}`);
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
    this.router.delete('/:id/application', this._delete);
    this.router.get('/', this._getAllUsers);
    this.router.post('/', this._createUser);
    this.router.get('/:id', this._getUser);
    this.router.patch('/users/:id/application', this._updateLoanApplication);
    this.router.post('/:userId/applications', this._createLoanApplication);
    this.router.post('/:id/application/submit', this._submitLoanApplication);
  }
}
