import { isEqual } from "lodash";

export abstract class ValueObject<T, U> {
  // @ts-expect-error このような型の混同を防ぐため -> https://zenn.dev/yamachan0625/books/ddd-hands-on/viewer/chapter8_value_object
  private _type: U;
  protected readonly _value: T;

  constructor(value: T) {
    this.validate(value);
    this._value = value;
  }

  protected abstract validate(value: T): void;

  get value(): T {
    return this._value;
  }

  equals(other: ValueObject<T, U>): boolean {
    return isEqual(this._value, other._value);
  }
}
