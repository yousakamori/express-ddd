import { BookId } from "Domain/models/Book/BookId/BookId";

export class ISBNDuplicationCheckDomainService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(isbn: BookId): Promise<boolean> {
    const isDuplicateISBN = false;

    return isDuplicateISBN;
  }
}
