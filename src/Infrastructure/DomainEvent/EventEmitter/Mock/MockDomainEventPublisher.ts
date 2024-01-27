import { DomainEvent } from "Domain/shared/DomainEvent/DomainEvent";
import { IDomainEventPublisher } from "Domain/shared/DomainEvent/IDomainEventPublisher";

export class MockDomainEventPublisher implements IDomainEventPublisher {
  publish(domainEvent: DomainEvent): void {
    domainEvent;
  }
}
