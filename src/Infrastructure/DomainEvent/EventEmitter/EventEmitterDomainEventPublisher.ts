import { DomainEvent } from "Domain/shared/DomainEvent/DomainEvent";
import { IDomainEventPublisher } from "Domain/shared/DomainEvent/IDomainEventPublisher";
import { container } from "tsyringe";
import EventEmitterClient from "./EventEmitterClient";

export class EventEmitterDomainEventPublisher implements IDomainEventPublisher {
  publish(domainEvent: DomainEvent) {
    container
      .resolve(EventEmitterClient)
      .eventEmitter.emit(domainEvent.eventName, domainEvent);
  }
}
