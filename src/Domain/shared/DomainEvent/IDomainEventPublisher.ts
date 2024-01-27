import { DomainEvent } from "./DomainEvent";

export interface IDomainEventPublisher {
  publish(domainEvent: DomainEvent): void;
}
