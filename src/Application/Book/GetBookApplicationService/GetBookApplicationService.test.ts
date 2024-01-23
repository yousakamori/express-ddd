import { InMemoryBookRepository } from "Infrastructure/InMemory/Book/InMemoryBookRepository";
import { GetBookApplicationService } from "./GetBookApplicationService";
import { bookTestDataCreator } from "Infrastructure/shared/Book/bookTestDataCreator";
import { BookDTO } from "../BookDTO";

describe("GetBookApplicationService", () => {
  it("指定されたIDの書籍が存在する場合、DTOに詰め替えられ取得できる", async () => {
    const repository = new InMemoryBookRepository();
    const getBookApplicationService = new GetBookApplicationService(repository);

    const createBook = await bookTestDataCreator(repository)({});

    const data = await getBookApplicationService.execute(
      createBook.bookId.value
    );

    expect(data).toEqual(new BookDTO(createBook));
  });

  it("指定されたIDの書籍が存在しない場合、nullが取得できる", async () => {
    const repository = new InMemoryBookRepository();
    const getBookApplicationService = new GetBookApplicationService(repository);

    const data = await getBookApplicationService.execute("9784167158057");

    expect(data).toBeNull();
  });
});
