import { ID } from "src/shared/value-objects";
import { SkillDomainError } from "./domain-errors";
import { AggregateRoot } from "src/shared/domain";
import { SkillCreatedDomainEvent, SkillDeletedDomainEvent } from "./domain-events";

export class Skill extends AggregateRoot {
    constructor(
        private readonly _id: ID,
        private readonly _portfolioId: ID,
        public readonly name: String,
    ) {
        super();
    }

    delete() {
        this.registerEvent(SkillDeletedDomainEvent.create(this.id));
    }

    static fromJSON(json: Record<string, unknown>): Skill {
        if (!json.id || !json.portfolioId || !json.name) {
            throw SkillDomainError.InvalidJSON();
        }

        return new Skill(
            ID.create(json.id),
            ID.create(json.portfolioId),
            new String(json.name)
        );
    }

    static create(id: ID, portfolioId: ID, name: String): Skill {
        const user = new Skill(id, portfolioId, name);
        user.registerEvent(SkillCreatedDomainEvent.create(user.id));
        return user;
    }

    toJSON() {
        return {
            id: this.id,
            portfolioId: this.portfolioId,
            name: this.name.toString()
        };
    }

    get id(): string {
        return this._id.value;
    }

    get portfolioId(): string {
        return this._portfolioId.value;
    }
}