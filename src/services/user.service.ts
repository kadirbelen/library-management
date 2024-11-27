import { Prisma } from '@prisma/client';

import prisma from '../utils/prisma-client.util';
import { CreateUserPayload } from '../validations/user.validation';

class UserService {
  async create(body: CreateUserPayload) {
    const result = await prisma.user.create({
      data: body,
    });

    return result;
  }

  async list() {
    return await prisma.user.findMany({ select: { id: true, name: true } });
  }

  async getByUniqueField(query: Prisma.UserWhereUniqueInput) {
    return await prisma.user.findUnique({ where: query });
  }

  async getDetails(userId: number) {
    const user = await prisma.user.findFirstOrThrow({
      where: { id: userId },
      include: {
        borrowed_books: {
          include: { book: true },
        },
      },
    });

    const { past, present } = user.borrowed_books.reduce(
      (acc, borrowedBook) => {
        if (borrowedBook.returned_at !== null) {
          acc.past.push({
            name: borrowedBook.book.name,
            userScore: borrowedBook.score!,
          });
        } else {
          acc.present.push({
            name: borrowedBook.book.name,
          });
        }
        return acc;
      },
      { past: [] as { name: string; userScore: number }[], present: [] as { name: string }[] },
    );

    return {
      id: user.id,
      name: user.name,
      books: {
        past,
        present,
      },
    };
  }
}

export default new UserService();
