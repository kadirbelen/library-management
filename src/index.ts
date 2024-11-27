import 'dotenv/config';

import express from 'express';

import { errorHandler } from './middlewares/error-handler.middleware';
import userRouter from './routers/user.router';

const app = express();
app.use(express.json());

app.use('/users', userRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.info('application is running');
});
