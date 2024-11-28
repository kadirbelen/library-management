import 'dotenv/config';
import 'express-async-errors';

import express from 'express';

import { errorHandler } from './middlewares/error-handler.middleware';
import bookRouter from './routers/book.router';
import userRouter from './routers/user.router';

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/books', bookRouter);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.info('Application is running', process.env.PORT);
});
