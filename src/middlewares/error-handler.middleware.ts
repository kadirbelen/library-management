import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '../responses/errors/app.error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json(err.toJSON());

    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: [
      {
        message: 'Internal Server Error',
      },
    ],
    success: false,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  });
};
