import { PrismaClient } from "@prisma/client";
import { ISBNDuplicationCheckDomainService } from "./ISBNDuplicationCheckDomainService";
import { BookId } from "Domain/models/Book/BookId/BookId";

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      book: {
        findUnique: jest.fn(),
      },
    })),
  };
});

describe("ISBNDuplicationCheckDomainService", () => {
  test("ISBNが重複していない場合falseを返す", async () => {
    const prisma = new PrismaClient();
    const service = new ISBNDuplicationCheckDomainService();

    (prisma.book.findUnique as jest.Mock).mockResolvedValue(null);
    const isbn = new BookId("9784167158057");
    expect(await service.execute(isbn)).toBeFalsy();
  });
});
