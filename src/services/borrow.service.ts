import { ConflictError } from '../errors/conflict.error';
import { NotFoundError } from '../errors/not-found.error';
import prisma from '../utils/prisma-client.util';
import bookService from './book.service';
import userService from './user.service';

class BorrowService {
  async borrowBook(userId: number, bookId: number) {
    const { user, book } = await this.checkAndGetUserAndBook(userId, bookId);

    const isBorrowed = await prisma.borrowedBook.findFirst({
      where: { book_id: book.id, returned_at: null },
    });

    if (isBorrowed) throw new ConflictError('This book is already borrowed by another user.');

    await prisma.borrowedBook.create({ data: { user_id: user.id, book_id: book.id } });
  }

  async returnBook({ userId, bookId, score }: { userId: number; bookId: number; score: number }) {
    const { user, book } = await this.checkAndGetUserAndBook(userId, bookId);

    const borrowedBook = await prisma.borrowedBook.findFirst({
      where: { user_id: user.id, book_id: book.id, returned_at: null },
    });

    if (!borrowedBook) {
      throw new NotFoundError({ message: `Book with ID ${bookId} was not borrowed by user with ID ${userId}.` });
    }

    await prisma.$transaction(async (prismaTransaction) => {
      await prismaTransaction.borrowedBook.update({
        where: { id: borrowedBook.id },
        data: { score, returned_at: new Date() },
      });

      const newRatingCount = book.rating_count + 1;
      const newAverageScore = (book.rating_count * book.average_score + score) / newRatingCount;

      await prismaTransaction.book.update({
        where: { id: book.id },
        data: { average_score: newAverageScore, rating_count: newRatingCount },
      });
    });
  }

  private async checkAndGetUserAndBook(userId: number, bookId: number) {
    const user = await userService.getByUniqueField({ id: userId });

    if (!user) throw new NotFoundError({ resourceName: 'User' });

    const book = await bookService.getByUniqueField({ id: bookId });

    if (!book) throw new NotFoundError({ resourceName: 'Book' });

    return { user, book };
  }
}

export default new BorrowService();
