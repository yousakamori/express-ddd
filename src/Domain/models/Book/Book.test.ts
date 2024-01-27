import { BOOK_EVENT_NAME } from "Domain/shared/DomainEvent/Book/BookDomainEventFactory";
import { Book } from "./Book";
import { BookId } from "./BookId/BookId";
import { Price } from "./Price/Price";
import { QuantityAvailable } from "./Stock/QuantityAvailable/QuantityAvailable";
import { Status, StatusEnum } from "./Stock/Status/Status";
import { Stock } from "./Stock/Stock";
import { StockId } from "./Stock/StockId/StockId";
import { Title } from "./Title/Title";

jest.mock("nanoid", () => ({ nanoid: () => "testIdWithExactLength" }));

describe("Book", () => {
  const stockId = new StockId("abc");
  const quantityAvailable = new QuantityAvailable(100);
  const status = new Status(StatusEnum.InStock);
  const stock = Stock.reconstruct(stockId, quantityAvailable, status);

  const bookId = new BookId("9784167158057");
  const title = new Title("吾輩は猫である");
  const price = new Price({
    amount: 770,
    currency: "JPY",
  });

  describe("create", () => {
    it("デフォルト値で在庫を作成する", () => {
      const book = Book.create(bookId, title, price);

      expect(book.bookId.equals(bookId)).toBeTruthy();
      expect(book.title.equals(title)).toBeTruthy();
      expect(book.price.equals(price)).toBeTruthy();

      expect(
        book.stockId.equals(new StockId("testIdWithExactLength"))
      ).toBeTruthy();

      expect(
        book.quantityAvailable.equals(new QuantityAvailable(0))
      ).toBeTruthy();
      expect(
        book.status.equals(new Status(StatusEnum.OutOfStock))
      ).toBeTruthy();
    });
    // TODO: delete と depleted のDomainEventテストも追加
    it("デフォルト値で在庫を作成し、ドメインイベントが生成される", () => {
      const book = Book.create(bookId, title, price);
      expect(book.getDomainEvents()[0].eventName).toBe(BOOK_EVENT_NAME.CREATED);
    });
  });

  describe("delete", () => {
    it("在庫ありの場合は例外を投げる", () => {
      const book = Book.reconstruct(bookId, title, price, stock);

      expect(() => book.delete()).toThrow("在庫がある場合は削除できません");
    });

    it("在庫なしの場合は例外を投げない", () => {
      const notOnSalesStatus = new Status(StatusEnum.OutOfStock);
      const notQuantityAvailable = new QuantityAvailable(0);
      const stock = Stock.reconstruct(
        stockId,
        notQuantityAvailable,
        notOnSalesStatus
      );

      const book = Book.reconstruct(bookId, title, price, stock);

      expect(() => book.delete()).not.toThrow();
    });
  });

  describe("isSalable", () => {
    it("在庫あり、在庫数が整数の場合はtrueを返す", () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);
      const book = Book.reconstruct(bookId, title, price, stock);

      expect(book.isSalable()).toBeTruthy();
    });

    it("在庫なし、在庫数0の場合はfalseを返す", () => {
      const notOnSalesStatus = new Status(StatusEnum.OutOfStock);
      const notQuantityAvailable = new QuantityAvailable(0);
      const stock = Stock.reconstruct(
        stockId,
        notQuantityAvailable,
        notOnSalesStatus
      );
      const book = Book.reconstruct(bookId, title, price, stock);

      expect(book.isSalable()).toBeFalsy();
    });
  });

  describe("increaseStock", () => {
    it("stock.increaseQuantityが呼ばれる", () => {
      const book = Book.reconstruct(bookId, title, price, stock);
      const spy = jest.spyOn(stock, "increaseQuantity");
      book.increaseStock(10);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe("decreaseStock", () => {
    it("stock.decreaseQuantityが呼ばれる", () => {
      const book = Book.reconstruct(bookId, title, price, stock);
      const spy = jest.spyOn(stock, "decreaseQuantity");
      book.decreaseStock(10);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe("changeTitle", () => {
    it("titleを変更する", () => {
      const book = Book.reconstruct(bookId, title, price, stock);
      const newTitle = new Title("坊っちゃん");
      book.changeTitle(newTitle);

      expect(book.title.equals(newTitle)).toBeTruthy();
    });
  });

  describe("changePrice", () => {
    it("priceを変更する", () => {
      const book = Book.reconstruct(bookId, title, price, stock);
      const newPrice = new Price({ amount: 880, currency: "JPY" });
      book.changePrice(newPrice);

      expect(book.price.equals(newPrice)).toBeTruthy();
    });
  });
});
