import { DomainEvent } from "Domain/shared/DomainEvent/DomainEvent";
import { IDomainEventSubscriber } from "Domain/shared/DomainEvent/IDomainEventSubscriber";
import { container } from "tsyringe";
import EventEmitterClient from "./EventEmitterClient";

export class EventEmitterDomainEventSubscriber
  implements IDomainEventSubscriber
{
  subscribe<T extends Record<string, unknown>>(
    eventName: string,
    callback: (event: DomainEvent<T>) => void
  ): void {
    container
      .resolve(EventEmitterClient)
      .eventEmitter.once(eventName, callback);
  }
}
