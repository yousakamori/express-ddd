import { Book } from "Domain/models/Book/Book";
import { BookId } from "Domain/models/Book/BookId/BookId";
import { IBookRepository } from "Domain/models/Book/IBookRepository";
import { Price } from "Domain/models/Book/Price/Price";
import { Title } from "Domain/models/Book/Title/Title";
import { ISBNDuplicationCheckDomainService } from "Domain/services/Book/ISBNDuplicationCheckDomainService/ISBNDuplicationCheckDomainService";
import { ITransactionManager } from "Application/shared/ITransactionManager";

export type RegisterBookCommand = {
  isbn: string;
  title: string;
  priceAmount: number;
};

// ここで重要なのは、ISBN の重複チェックのビジネスロジックや、Bookエンティティ生成時のビジネスロジックがドメインオブジェクトに隠蔽されているということです。これにより、アプリケーションサービスの実装はドメイン知識を持たない状態で、ドメインオブジェクトを利用するだけでユースケースを実現することができます。
export class RegisterBookApplicationService {
  constructor(
    private bookRepository: IBookRepository,
    private transactionManager: ITransactionManager
  ) {}

  async execute(command: RegisterBookCommand): Promise<void> {
    await this.transactionManager.begin(async () => {
      const isDuplicateISBN = await new ISBNDuplicationCheckDomainService(
        this.bookRepository
      ).execute(new BookId(command.isbn));

      if (isDuplicateISBN) {
        throw new Error("すでに存在する書籍です");
      }

      const book = Book.create(
        new BookId(command.isbn),
        new Title(command.title),
        new Price({ amount: command.priceAmount, currency: "JPY" })
      );

      await this.bookRepository.save(book);
    });
  }
}
