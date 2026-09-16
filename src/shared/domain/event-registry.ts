const EVENTS_STORAGE = Symbol("EVENTS_STORAGE");

export interface IDomainEvent {
    readonly eventName: string;
    readonly occurredAt: Date;
}

export class DomainEventRegistry {
    private [EVENTS_STORAGE]: IDomainEvent[] = [];

    registerEvent<T extends IDomainEvent>(event: T) {
        if (!event.eventName) {
            throw new Error("Event name is required");
        }

        if (!event.occurredAt) {
            throw new Error("Occurred at is required");
        }

        if (!(event.occurredAt instanceof Date)) {
            throw new Error("Occurred at must be a date");
        }

        this[EVENTS_STORAGE].push(event);
    }

    flushEvents() {
        const events = this[EVENTS_STORAGE];
        this[EVENTS_STORAGE] = [];
        return events;
    }
}