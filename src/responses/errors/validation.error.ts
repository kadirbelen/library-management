import StatusCodes from 'http-status-codes';
import { ZodError } from 'zod';

import { AppError } from './app.error';

export class ValidationError extends AppError {
  error: ZodError;

  constructor(error: ZodError) {
    super(error.errors.map((error) => error.message).join(', '), StatusCodes.UNPROCESSABLE_ENTITY);
    this.error = error;
  }

  toJSON() {
    const errors = this.error.errors.map((error) => {
      return {
        field: error.path.join('.') || (error as any)?.keys?.at(0) || '',
        code: error.code,
        message: error.message,
      };
    });

    return {
      errors,
      success: false,
      statusCode: this.statusCode,
    };
  }
}
