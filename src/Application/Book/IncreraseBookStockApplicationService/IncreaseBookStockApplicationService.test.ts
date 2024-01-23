import { MockTransactionManager } from "Application/shared/MockTransactionManager";
import { InMemoryBookRepository } from "Infrastructure/InMemory/Book/InMemoryBookRepository";
import {
  IncreaseBookStockApplicationService,
  IncreaseBookStockCommand,
} from "./IncreaseBookStockApplicationService";
import { bookTestDataCreator } from "Infrastructure/shared/Book/bookTestDataCreator";
import { BookId } from "Domain/models/Book/BookId/BookId";

describe("IncreaseBookStockApplicationService", () => {
  it("書籍の在庫を増加することができる", async () => {
    const repository = new InMemoryBookRepository();
    const mockTransactionManager = new MockTransactionManager();

    const increaseBookStockApplicationService =
      new IncreaseBookStockApplicationService(
        repository,
        mockTransactionManager
      );

    const bookId = "9784167158057";
    await bookTestDataCreator(repository)({ bookId, quantityAvailable: 0 });

    const incrementAmount = 100;
    const command: Required<IncreaseBookStockCommand> = {
      bookId,
      incrementAmount,
    };

    await increaseBookStockApplicationService.execute(command);

    const updatedBook = await repository.find(new BookId(bookId));

    expect(updatedBook?.quantityAvailable.value).toEqual(incrementAmount);
  });

  it("書籍が存在しない場合例外を投げる", async () => {
    const repository = new InMemoryBookRepository();
    const mockTransactionManager = new MockTransactionManager();

    const increaseBookStockApplicationService =
      new IncreaseBookStockApplicationService(
        repository,
        mockTransactionManager
      );

    const bookId = "9784167158057";
    const incrementAmount = 100;

    const command: Required<IncreaseBookStockCommand> = {
      bookId,
      incrementAmount,
    };

    await expect(
      increaseBookStockApplicationService.execute(command)
    ).rejects.toThrow();
  });
});
