import { Request, Response, Router } from 'express';
import { getRepository } from 'typeorm';
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

  private routes() {
    this.router.get('/', this.getAllUsers);
  }
}
