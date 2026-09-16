import { IDomainEvent } from "src/shared/domain";

export class ProjectCreatedDomainEvent implements IDomainEvent {
    eventName = 'project.created';
    occurredAt: Date;

    constructor(readonly id: string) {
        this.occurredAt = new Date();
    }

    static create(id: string): ProjectCreatedDomainEvent {
        return new ProjectCreatedDomainEvent(id);
    }
}

export class ProjectDeletedDomainEvent implements IDomainEvent {
    eventName = 'project.deleted';
    occurredAt: Date;

    constructor(readonly id: string) {
        this.occurredAt = new Date();
    }

    static create(id: string): ProjectDeletedDomainEvent {
        return new ProjectDeletedDomainEvent(id);
    }
}