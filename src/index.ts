import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { param, query, validationResult } from 'express-validator';
import morgan from 'morgan';
import scrape from './scrape';
import prisma from './prisma';
import { isLocked } from './lock';
import getPrediction from './prediction';

const app = express();

const validateErrors = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return next();
};

const auth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.headers.authorization === `Bearer ${process.env.AUTH_SECRET}`) {
    return next();
  }

  return res.status(403).send();
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/prediction', validateErrors, async (req: express.Request, res) => {
  console.log(req.body);
  const prediction = await getPrediction();

  console.log(prediction);

  return res.status(200).send(prediction);
});

// app.use(auth);

const port = Number(process.env.PORT) || 3000;
app.listen(port);
console.log(`Server started at :${port}`);
