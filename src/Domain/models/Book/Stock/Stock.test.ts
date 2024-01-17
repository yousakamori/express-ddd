import { QuantityAvailable } from "Domain/Book/Stock/QuantityAvailable/QuantityAvailable";
import { Status, StatusEnum } from "Domain/Book/Stock/Status/Status";
import { StockId } from "Domain/Book/Stock/StockId/StockId";
import { Stock } from "./Stock";

jest.mock("nanoid", () => ({ nanoid: () => "testIdWithExactLength" }));

describe("Stock", () => {
  const stockId = new StockId("abc");
  const quantityAvailable = new QuantityAvailable(100);
  const status = new Status(StatusEnum.InStock);

  describe("create", () => {
    test("デフォルト値で在庫を作成する", () => {
      const stock = Stock.create();

      expect(
        stock.stockId.equals(new StockId("testIdWithExactLength"))
      ).toBeTruthy();

      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(0))
      ).toBeTruthy();

      expect(
        stock.status.equals(new Status(StatusEnum.OutOfStock))
      ).toBeTruthy();
    });
  });

  describe("delete", () => {
    test("在庫ありの場合は例外を投げる", () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);

      expect(() => stock.delete()).toThrow("在庫がある場合は削除できません");
    });

    test("在庫なしの場合は例外を投げない", () => {
      const notOnSaleStatus = new Status(StatusEnum.OutOfStock);
      const stock = Stock.reconstruct(
        stockId,
        quantityAvailable,
        notOnSaleStatus
      );

      expect(() => stock.delete()).not.toThrow();
    });
  });

  describe("increaseQuantity", () => {
    test("在庫数を増やす", () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);

      stock.increaseQuantity(5);

      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(105))
      ).toBeTruthy();
    });

    test("増加量が負の数の場合は例外を投げる", () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);

      expect(() => stock.increaseQuantity(-1)).toThrow(
        "増加量は0以上でなければなりません"
      );
    });
  });

  describe("decreaseQuantity", () => {
    test("在庫数を減らす", () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);

      stock.decreaseQuantity(5);

      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(95))
      ).toBeTruthy();
    });

    test("減少量が負の数の場合は例外を投げる", () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);

      expect(() => stock.decreaseQuantity(-1)).toThrow(
        "減少量は0以上でなければなりません"
      );
    });

    test("減少量の在庫数が0未満になる場合は例外を投げる", () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);

      expect(() => stock.decreaseQuantity(101)).toThrow();
    });

    test("減少量が0になったらステータスを在庫切れにする", () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);
      stock.decreaseQuantity(100);

      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(0))
      ).toBeTruthy();

      expect(
        stock.status.equals(new Status(StatusEnum.OutOfStock))
      ).toBeTruthy();
    });

    test("在庫数が10以下になったらステータスを残りわずかにする", () => {
      const stock = Stock.reconstruct(stockId, quantityAvailable, status);
      stock.decreaseQuantity(90);

      expect(
        stock.quantityAvailable.equals(new QuantityAvailable(10))
      ).toBeTruthy();

      expect(stock.status.equals(new Status(StatusEnum.LowStock))).toBeTruthy();
    });
  });
});
