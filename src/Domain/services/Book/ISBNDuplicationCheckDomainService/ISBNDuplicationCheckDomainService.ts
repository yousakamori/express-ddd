import { BookId } from "Domain/models/Book/BookId/BookId";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ISBNDuplicationCheckDomainService {
  async execute(isbn: BookId): Promise<boolean> {
    const duplicateISBNBok = await prisma.book.findUnique({
      where: {
        bookId: isbn.value,
      },
    });

    const isDuplicateISBN = duplicateISBNBok !== null;
    return isDuplicateISBN;
  }
}
