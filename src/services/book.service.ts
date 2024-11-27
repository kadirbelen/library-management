import { Prisma } from '@prisma/client';

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
    const { average_score, ...book } = await prisma.book.findFirstOrThrow({
      where: { id: bookId },
      select: { id: true, name: true, average_score: true },
    });

    return {
      ...book,
      score: average_score ? average_score : -1,
    };
  }
}

export default new BookService();
