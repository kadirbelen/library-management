import { Response } from 'express';

export const successResponse = ({ res, statusCode, data }: { res: Response; statusCode: number; data: any }) => {
  res.status(statusCode).json(data);
};
