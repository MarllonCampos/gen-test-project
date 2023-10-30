import express, { Response } from 'express';
import { configDotenv } from 'dotenv';
import { router } from './routes';
configDotenv();

const RUNNING_PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.get('/', (_req, res: Response) => {
  res.send(`Working: ${RUNNING_PORT}`);
});

app.use(router);

app.listen(RUNNING_PORT, () => {
  console.log(`Server Working on PORT: ${RUNNING_PORT}`);
});
