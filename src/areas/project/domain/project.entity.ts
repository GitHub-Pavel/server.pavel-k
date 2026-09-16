import { ID } from "src/shared/value-objects";
import { ProjectDomainError } from "./domain-errors";
import { AggregateRoot } from "src/shared/domain";
import { ProjectCreatedDomainEvent, ProjectDeletedDomainEvent } from "./domain-events";

export class Project extends AggregateRoot {
    constructor(
        private readonly _id: ID,
        private readonly _portfolioId: ID,
        public readonly name: String,
        public readonly link: String,
    ) {
        super();
    }

    delete() {
        this.registerEvent(ProjectDeletedDomainEvent.create(this.id));
    }

    static fromJSON(json: Record<string, unknown>): Project {
        if (!json.id || !json.portfolioId || !json.name || !json.link) {
            throw ProjectDomainError.InvalidJSON();
        }

        return new Project(
            ID.create(json.id),
            ID.create(json.portfolioId),
            new String(json.name),
            new String(json.link)
        );
    }

    static create(id: ID, portfolioId: ID, name: String, link: String): Project {
        const user = new Project(id, portfolioId, name, link);
        user.registerEvent(ProjectCreatedDomainEvent.create(user.id));
        return user;
    }

    toJSON() {
        return {
            id: this.id,
            portfolioId: this.portfolioId,
            name: this.name.toString(),
            link: this.link.toString()
        };
    }

    get id(): string {
        return this._id.value;
    }

    get portfolioId(): string {
        return this._portfolioId.value;
    }
}