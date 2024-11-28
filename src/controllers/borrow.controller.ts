import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import borrowService from '../services/borrow.service';
import { successResponse } from '../utils/success-response.util';

class BorrowController {
  async borrowBook(req: Request, res: Response) {
    await borrowService.borrowBook(parseInt(req.params.userId), parseInt(req.params.bookId));

    successResponse({ res, statusCode: StatusCodes.NO_CONTENT });
  }

  async returnBook(req: Request, res: Response) {
    await borrowService.returnBook({
      userId: parseInt(req.params.userId),
      bookId: parseInt(req.params.bookId),
      score: req.body.score,
    });

    successResponse({ res, statusCode: StatusCodes.NO_CONTENT });
  }
}

export default new BorrowController();
