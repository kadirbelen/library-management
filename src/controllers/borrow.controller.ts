import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import borrowService from '../services/borrow.service';

class BorrowController {
  async borrowBook(req: Request, res: Response) {
    await borrowService.borrowBook(parseInt(req.params.userId), parseInt(req.params.bookId));

    res.status(StatusCodes.NO_CONTENT).send();
  }

  async returnBook(req: Request, res: Response) {
    await borrowService.returnBook({
      userId: parseInt(req.params.userId),
      bookId: parseInt(req.params.bookId),
      score: req.body.score,
    });

    res.status(StatusCodes.NO_CONTENT).send();
  }
}

export default new BorrowController();
