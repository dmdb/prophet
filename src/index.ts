import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { validationResult } from 'express-validator';
import morgan from 'morgan';
import { postPrediction } from './prediction';

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
  const { token } = req.body;

  if (process.env.VERIFICATION_TOKEN && token !== process.env.VERIFICATION_TOKEN) {
    return res.status(403).send();
  }

  return next();
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(auth);

app.post('/prediction', validateErrors, async (req: express.Request, res) => {
  console.log(req.body);
  const { channel_id: channel } = req.body;

  postPrediction(channel);

  return res.status(200).send();
});



const port = Number(process.env.PORT) || 3000;
app.listen(port);
console.log(`Server started at :${port}`);
