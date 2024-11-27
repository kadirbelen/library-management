import { Prisma } from '@prisma/client';

import { NotFoundError } from '../errors/not-found.error';
import prisma from '../utils/prisma-client.util';
import { CreateBookPayload } from '../validations/book.validation';

class BookService {
  async create(payload: CreateBookPayload) {
    return await prisma.book.create({ data: payload });
  }

  async list() {
    return await prisma.book.findMany({ select: { id: true, name: true } });
  }

  async getByUniqueField(query: Prisma.BookWhereUniqueInput) {
    return await prisma.book.findUnique({ where: query });
  }

  async getDetails(bookId: number) {
    const book = await prisma.book.findFirst({
      where: { id: bookId },
      select: { id: true, name: true, average_score: true },
    });

    if (!book) throw new NotFoundError({ resourceName: 'Book' });

    return {
      id: book.id,
      name: book.name,
      score: book.average_score ? book.average_score : -1,
    };
  }
}

export default new BookService();
