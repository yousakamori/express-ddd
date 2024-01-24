import { BookId } from "Domain/models/Book/BookId/BookId";
import { BookDTO } from "../BookDTO";
import { IBookRepository } from "Domain/models/Book/IBookRepository";
import { injectable, inject } from "tsyringe";

@injectable()
export class GetBookApplicationService {
  constructor(
    @inject("IBookRepository")
    private bookRepository: IBookRepository
  ) {}

  async execute(isbn: string): Promise<BookDTO | null> {
    const book = await this.bookRepository.find(new BookId(isbn));

    // アプリケーションサービスのクライアントであるプレゼンテーション層にドメインオブジェクトが漏れるのを防ぐためにDTO(data transfer object)を使用する
    return book ? new BookDTO(book) : null;
  }
}
