import { IDomainEvent } from "src/shared/domain";

export class SkillCreatedDomainEvent implements IDomainEvent {
    eventName = 'skill.created';
    occurredAt: Date;

    constructor(readonly id: string) {
        this.occurredAt = new Date();
    }

    static create(id: string): SkillCreatedDomainEvent {
        return new SkillCreatedDomainEvent(id);
    }
}

export class SkillDeletedDomainEvent implements IDomainEvent {
    eventName = 'skill.deleted';
    occurredAt: Date;

    constructor(readonly id: string) {
        this.occurredAt = new Date();
    }

    static create(id: string): SkillDeletedDomainEvent {
        return new SkillDeletedDomainEvent(id);
    }
}