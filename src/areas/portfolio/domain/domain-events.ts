import { IDomainEvent } from "src/shared/domain";

export class PortfolioCreatedDomainEvent implements IDomainEvent {
    eventName = 'portfolio.created';
    occurredAt: Date;

    constructor(readonly id: string) {
        this.occurredAt = new Date();
    }

    static create(id: string): PortfolioCreatedDomainEvent {
        return new PortfolioCreatedDomainEvent(id);
    }
}

export class PortfolioDeletedDomainEvent implements IDomainEvent {
    eventName = 'portfolio.deleted';
    occurredAt: Date;

    constructor(readonly id: string) {
        this.occurredAt = new Date();
    }

    static create(id: string): PortfolioDeletedDomainEvent {
        return new PortfolioDeletedDomainEvent(id);
    }
}