import {
  BOOK_EVENT_NAME,
  BookDomainEventBody,
} from "Domain/shared/DomainEvent/Book/BookDomainEventFactory";
import { IDomainEventSubscriber } from "Domain/shared/DomainEvent/IDomainEventSubscriber";
import { inject, injectable } from "tsyringe";

@injectable()
export class BookLogSubscriber {
  constructor(
    @inject("IDomainEventSubscriber")
    private subscriber: IDomainEventSubscriber
  ) {
    this.subscriber.subscribe<BookDomainEventBody>(
      BOOK_EVENT_NAME.CREATED,
      (event) => {
        console.log(event);
      }
    );
  }
}
