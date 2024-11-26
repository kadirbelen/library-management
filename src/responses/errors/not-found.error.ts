import StatusCodes from 'http-status-codes';

import { AppError } from './app.error';

export class NotFoundError extends AppError {
  constructor({ message, resourceName = 'Resource' }: { message?: string; resourceName?: string }) {
    const _message = message ? message : `${resourceName} not found.`;

    super(_message, StatusCodes.NOT_FOUND);
  }
}
