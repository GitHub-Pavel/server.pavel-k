import { IEvent } from "@nestjs/cqrs";

export class ExperienceDeletedEvent implements IEvent {
    constructor(public readonly id: string) {}

    static create(id: string): ExperienceDeletedEvent {
        return new ExperienceDeletedEvent(id);
    }
}

export class ExperienceCreatedEvent implements IEvent {
    constructor(public readonly id: string) {}
    
    static create(id: string): ExperienceCreatedEvent {
        return new ExperienceCreatedEvent(id);
    }
}