import { IEvent } from "@nestjs/cqrs";
import { IDomainEvent } from "src/shared/domain";
import { PortfolioCreatedEvent, PortfolioDeletedEvent } from ".";
import { PortfolioCreatedDomainEvent, PortfolioDeletedDomainEvent } from "../../domain";

export const eventsMapper = (event: IDomainEvent[]): IEvent[] => {
    return event.map(() => {
        if (event instanceof PortfolioCreatedDomainEvent) {
            return PortfolioCreatedEvent.create(event.id);
        }
        if (event instanceof PortfolioDeletedDomainEvent) {
            return PortfolioDeletedEvent.create(event.id);
        }
        return null;
    }).filter((event) => event !== null);
}