import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { BadRequestError } from '../errors/bad-request.error';

export const paramsIdValidator = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const paramsSchema = z.record(z.string(), z.string().regex(/^\d+$/).transform(Number));

    const result = paramsSchema.safeParse(req.params);

    if (!result.success) {
      const errors = result.error.errors.map((err) => {
        return `Invalid format for parameter '${err.path[0]}'. Expected a positive integer.`;
      });

      throw new BadRequestError(errors.join(' '));
    }

    req.params = result.data as unknown as Record<string, string>;

    next();
  } catch (error) {
    next(error);
  }
};
