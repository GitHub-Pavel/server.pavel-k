import { ID } from "src/shared/value-objects";
import { PortfolioDomainError } from "./domain-errors";
import { AggregateRoot } from "src/shared/domain";
import { PortfolioCreatedDomainEvent, PortfolioDeletedDomainEvent } from "./domain-events";

export class Portfolio extends AggregateRoot {
    constructor(
        private readonly _id: ID,
        public readonly name: String,
        public readonly description: String,
        public readonly link: String,
    ) {
        super();
    }

    delete() {
        this.registerEvent(PortfolioDeletedDomainEvent.create(this.id));
    }

    static fromJSON(json: Record<string, unknown>): Portfolio {
        if (!json.id || !json.name || !json.description || !json.link) {
            throw PortfolioDomainError.InvalidJSON();
        }

        return new Portfolio(
            ID.create(json.id),
            new String(json.name),
            new String(json.description),
            new String(json.link),
        );
    }

    static create(id: ID, name: String, description: String, link: String): Portfolio {
        const user = new Portfolio(id, name, description, link);
        user.registerEvent(PortfolioCreatedDomainEvent.create(user.id));
        return user;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name.toString(),
            description: this.description.toString(),
            link: this.link.toString(),
        };
    }

    get id(): string {
        return this._id.value;
    }
}