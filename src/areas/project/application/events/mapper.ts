import { IEvent } from "@nestjs/cqrs";
import { IDomainEvent } from "src/shared/domain";
import { ProjectCreatedEvent, ProjectDeletedEvent } from ".";
import { ProjectCreatedDomainEvent, ProjectDeletedDomainEvent } from "../../domain";

export const eventsMapper = (event: IDomainEvent[]): IEvent[] => {
    return event.map(() => {
            if (event instanceof ProjectCreatedDomainEvent) {
            return ProjectCreatedEvent.create(event.id);
        }
        if (event instanceof ProjectDeletedDomainEvent) {
            return ProjectDeletedEvent.create(event.id);
        }
        return null;
    }).filter((event) => event !== null);
}