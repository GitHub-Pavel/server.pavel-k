import { IEvent } from "@nestjs/cqrs";
import { IDomainEvent } from "src/shared/domain";
import { SkillCreatedEvent, SkillDeletedEvent } from ".";
import { SkillCreatedDomainEvent, SkillDeletedDomainEvent } from "../../domain";

export const eventsMapper = (event: IDomainEvent[]): IEvent[] => {
    return event.map(() => {
            if (event instanceof SkillCreatedDomainEvent) {
            return SkillCreatedEvent.create(event.id);
        }
        if (event instanceof SkillDeletedDomainEvent) {
            return SkillDeletedEvent.create(event.id);
        }
        return null;
    }).filter((event) => event !== null);
}