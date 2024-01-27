import { DomainEvent } from "Domain/shared/DomainEvent/DomainEvent";
import { IDomainEventSubscriber } from "Domain/shared/DomainEvent/IDomainEventSubscriber";

export class MockDomainEventSubscriber implements IDomainEventSubscriber {
  subscribe<T extends Record<string, unknown>>(
    eventName: string,
    callback: (event: DomainEvent<T>) => void
  ): void {
    eventName;
    callback;
  }
}
