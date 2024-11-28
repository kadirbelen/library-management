import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ConflictError } from '../errors/conflict.error';
import bookService from '../services/book.service';
import { successResponse } from '../utils/success-response.utils';

class BookController {
  async create(req: Request, res: Response) {
    const bookIsExist = await bookService.getByUniqueField({ name: req.body.name });

    if (bookIsExist) throw new ConflictError('Book already exist');

    await bookService.create(req.body);

    successResponse({ res, statusCode: StatusCodes.CREATED });
  }

  async list(_req: Request, res: Response) {
    const books = await bookService.list();

    successResponse({ res, statusCode: StatusCodes.OK, data: books });
  }

  async get(req: Request, res: Response) {
    const bookDetails = await bookService.getDetails(parseInt(req.params.bookId));

    successResponse({ res, statusCode: StatusCodes.OK, data: bookDetails });
  }
}

export default new BookController();
