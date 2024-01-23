import { MockTransactionManager } from "Application/shared/MockTransactionManager";
import { InMemoryBookRepository } from "Infrastructure/InMemory/Book/InMemoryBookRepository";
import {
  RegisterBookApplicationService,
  RegisterBookCommand,
} from "./RegisterBookApplicationService";
import { bookTestDataCreator } from "Infrastructure/shared/Book/bookTestDataCreator";

describe("RegisterBookApplicationService", () => {
  it("重複書籍が存在しない場合書籍が正常に作成できる", async () => {
    const repository = new InMemoryBookRepository();
    const mockTransactionManager = new MockTransactionManager();
    const registerBookApplicationService = new RegisterBookApplicationService(
      repository,
      mockTransactionManager
    );

    const command: Required<RegisterBookCommand> = {
      isbn: "9784167158057",
      title: "吾輩は猫である",
      priceAmount: 70,
    };

    const createBook = await registerBookApplicationService.execute(command);
    expect(createBook).not.toBeNull();
  });

  it("重複書籍が存在する場合例外を投げる", async () => {
    const repository = new InMemoryBookRepository();
    const mockTransactionManager = new MockTransactionManager();
    const registerBookApplicationService = new RegisterBookApplicationService(
      repository,
      mockTransactionManager
    );

    const bookID = "9784167158057";
    await bookTestDataCreator(repository)({ bookId: bookID });

    const command: Required<RegisterBookCommand> = {
      isbn: bookID,
      title: "吾輩は猫である",
      priceAmount: 770,
    };

    await expect(
      registerBookApplicationService.execute(command)
    ).rejects.toThrow();
  });
});
