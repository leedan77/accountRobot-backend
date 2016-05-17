import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { bearerToken } from '../middlewares/auth';
import router from '../routes';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bearerToken);

app.use(router);

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  res.status(400).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ?
      '' : err.stack.split('\n'),
  });
});
/* eslint-enable no-unused-vars */

app.use((req, res) => {
  res.status(404).json({
    message: 'no such route',
  });
});

export default app;
