import { IDomainEvent } from "src/shared/domain";

export class ExperienceCreatedDomainEvent implements IDomainEvent {
    eventName = 'experience.created';
    occurredAt: Date;

    constructor(readonly id: string) {
        this.occurredAt = new Date();
    }

    static create(id: string): ExperienceCreatedDomainEvent {
        return new ExperienceCreatedDomainEvent(id);
    }
}

export class ExperienceDeletedDomainEvent implements IDomainEvent {
    eventName = 'experience.deleted';
    occurredAt: Date;

    constructor(readonly id: string) {
        this.occurredAt = new Date();
    }

    static create(id: string): ExperienceDeletedDomainEvent {
        return new ExperienceDeletedDomainEvent(id);
    }
}