import { Response } from 'express';

export const successResponse = ({ res, statusCode, data }: { res: Response; statusCode: number; data?: any }) => {
  return data ? res.status(statusCode).json(data) : res.status(statusCode).send();
};
