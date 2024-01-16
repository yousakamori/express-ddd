import { describe } from "node:test";
import { Title } from "./Title";

describe("Title", () => {
  test("Titleが1文字で作成できる", () => {
    expect(new Title("a").value).toBe("a");
  });

  test("Titleが1000文字で作成できる", () => {
    const longTitle = "a".repeat(1000);
    expect(new Title("a".repeat(1000)).value).toBe(longTitle);
  });

  test("最少長以上の値でTitleを生成すると例外を投げる", () => {
    expect(() => new Title("")).toThrow(
      "タイトルは1文字以上、1000文字以下でなければなりません"
    );
  });

  test("最大長以上の値でTitleを生成すると例外を投げる", () => {
    const tooLongTitle = "a".repeat(1001);
    expect(() => new Title(tooLongTitle)).toThrow(
      "タイトルは1文字以上、1000文字以下でなければなりません"
    );
  });
});
