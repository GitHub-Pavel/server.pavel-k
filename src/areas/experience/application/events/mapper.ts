import { IEvent } from "@nestjs/cqrs";
import { IDomainEvent } from "src/shared/domain";
import { ExperienceCreatedEvent, ExperienceDeletedEvent } from ".";
import { ExperienceCreatedDomainEvent, ExperienceDeletedDomainEvent } from "../../domain";

export const eventsMapper = (event: IDomainEvent[]): IEvent[] => {
    return event.map(() => {
            if (event instanceof ExperienceCreatedDomainEvent) {
            return ExperienceCreatedEvent.create(event.id);
        }
        if (event instanceof ExperienceDeletedDomainEvent) {
            return ExperienceDeletedEvent.create(event.id);
        }
        return null;
    }).filter((event) => event !== null);
}