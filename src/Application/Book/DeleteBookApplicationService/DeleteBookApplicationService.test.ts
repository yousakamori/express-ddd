import { MockTransactionManager } from "Application/shared/MockTransactionManager";
import { InMemoryBookRepository } from "Infrastructure/InMemory/Book/InMemoryBookRepository";
import {
  DeleteBookApplicationService,
  DeleteBookCommand,
} from "./DeleteBookApplicationService";
import { bookTestDataCreator } from "Infrastructure/shared/Book/bookTestDataCreator";
import { BookId } from "Domain/models/Book/BookId/BookId";

describe("DeleteBookApplicationService", () => {
  it("書籍を削除することができる", async () => {
    const repository = new InMemoryBookRepository();
    const mockTransactionManager = new MockTransactionManager();

    const deleteBookApplicationService = new DeleteBookApplicationService(
      repository,
      mockTransactionManager
    );

    const bookId = "9784167158057";
    await bookTestDataCreator(repository)({
      bookId,
    });

    const command: Required<DeleteBookCommand> = {
      bookId,
    };
    await deleteBookApplicationService.execute(command);
    const deletedBook = await repository.find(new BookId(bookId));

    expect(deletedBook).toBeNull();
  });
});
