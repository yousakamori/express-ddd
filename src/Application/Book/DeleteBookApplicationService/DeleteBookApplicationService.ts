import { ITransactionManager } from "Application/shared/ITransactionManager";
import { BookId } from "Domain/models/Book/BookId/BookId";
import { IBookRepository } from "Domain/models/Book/IBookRepository";

export type DeleteBookCommand = {
  bookId: string;
};

export class DeleteBookApplicationService {
  constructor(
    private bookRepository: IBookRepository,
    private transactionManger: ITransactionManager
  ) {}

  async execute(command: DeleteBookCommand): Promise<void> {
    await this.transactionManger.begin(async () => {
      const book = await this.bookRepository.find(new BookId(command.bookId));

      if (!book) {
        throw new Error("書籍が存在し");
      }

      book.delete();

      await this.bookRepository.delete(book.bookId);
    });
  }
}
