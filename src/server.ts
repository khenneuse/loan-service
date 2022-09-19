import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[loan-service]: Server is running at http://localhost:${port}`);
});
