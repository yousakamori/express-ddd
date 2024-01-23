import { BookId } from "Domain/models/Book/BookId/BookId";
import { BookDTO } from "../BookDTO";
import { IBookRepository } from "Domain/models/Book/IBookRepository";

export class GetBookApplicationService {
  constructor(private bookRepository: IBookRepository) {}

  async execute(isbn: string): Promise<BookDTO | null> {
    const book = await this.bookRepository.find(new BookId(isbn));

    return book ? new BookDTO(book) : null;
  }
}