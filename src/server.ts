import express, { Express, Request, Response } from 'express';
import { createConnection } from 'typeorm';

const app: Express = express();
const port = 3000;

createConnection()
  .then(async () => {

    app.use(express.json());
    app.get('/', (_req: Request, res: Response) => {
      res.send('Express + TypeScript Server');
    });

    app.listen(port, () => {
      console.log(`⚡️[loan-service]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
