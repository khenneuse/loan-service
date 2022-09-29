import express, { Express, Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { LoanApplicationController, UserController } from './controllers';

export const app: Express = express();
const port = 3000;

const userController = new UserController();
const loanApplicationController = new LoanApplicationController();

app.use(express.json());
app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.use('/users', userController.router);
app.use('/applications', loanApplicationController.router);

createConnection()
  .then(async () => {
    app.listen(port, () => {
      console.log(`⚡️[loan-service]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
