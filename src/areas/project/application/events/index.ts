import { IEvent } from "@nestjs/cqrs";

export class ProjectDeletedEvent implements IEvent {
    constructor(readonly id: string) {}

    static create(id: string): ProjectDeletedEvent {
        return new ProjectDeletedEvent(id);
    }
}

export class ProjectCreatedEvent implements IEvent {
    constructor(readonly id: string) {}

    static create(id: string): ProjectCreatedEvent {
        return new ProjectCreatedEvent(id);
    }
}