import { describe } from "node:test";
import { Price } from "./Price";

describe("Price", () => {
  it("正しい値と通過コードJPYで有効なPriceを作成する", () => {
    const validAmount = 500;
    const price = new Price({ amount: validAmount, currency: "JPY" });
    expect(price.amount).toBe(validAmount);
    expect(price.currency).toBe("JPY");
  });

  it("無効な通貨コードの場合は例外を投げる", () => {
    const invalidCurrency = "USD";

    // @ts-expect-error テストのために無効な値を渡す
    expect(() => new Price({ amount: 500, currency: invalidCurrency })).toThrow(
      "現在は日本円のみを扱います"
    );
  });

  it("MIN未満の値でPriceを設定すると例外を投げる", () => {
    const lessThanMin = Price.MIN - 1;

    expect(() => new Price({ amount: lessThanMin, currency: "JPY" })).toThrow(
      `価格は${Price.MIN}円から${Price.MAX}円の間でなければなりません`
    );
  });

  it("MAX超の値でPriceを設定すると例外を投げる", () => {
    const moreThanMax = Price.MAX + 1;

    expect(() => new Price({ amount: moreThanMax, currency: "JPY" })).toThrow(
      `価格は${Price.MIN}円から${Price.MAX}円の間でなければなりません`
    );
  });
});
