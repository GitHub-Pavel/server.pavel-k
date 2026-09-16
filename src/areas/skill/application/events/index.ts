import { IEvent } from "@nestjs/cqrs";

export class SkillDeletedEvent implements IEvent {
    constructor(readonly id: string) {}

    static create(id: string): SkillDeletedEvent {
        return new SkillDeletedEvent(id);
    }
}

export class SkillCreatedEvent implements IEvent {
    constructor(readonly id: string) {}

    static create(id: string): SkillCreatedEvent {
        return new SkillCreatedEvent(id);
    }
}