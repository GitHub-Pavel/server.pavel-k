import { IEvent } from "@nestjs/cqrs";

export class PortfolioDeletedEvent implements IEvent {
    private constructor(readonly id: string) {}

    static create(id: string): PortfolioDeletedEvent {
        return new PortfolioDeletedEvent(id);
    }
}

export class PortfolioCreatedEvent implements IEvent {
    private constructor(readonly id: string) {}
    
    static create(id: string): PortfolioCreatedEvent {
        return new PortfolioCreatedEvent(id);
    }
}