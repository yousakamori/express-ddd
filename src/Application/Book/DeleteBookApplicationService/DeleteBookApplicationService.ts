import { ITransactionManager } from "Application/shared/ITransactionManager";
import { BookId } from "Domain/models/Book/BookId/BookId";
import { IBookRepository } from "Domain/models/Book/IBookRepository";
import { injectable, inject } from "tsyringe";

export type DeleteBookCommand = {
  bookId: string;
};

@injectable()
export class DeleteBookApplicationService {
  constructor(
    @inject("IBookRepository")
    private bookRepository: IBookRepository,
    @inject("ITransactionManager")
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
