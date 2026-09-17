import { DateValueObject, ID } from "src/shared/value-objects";
import { ExperienceDomainError } from "./domain-errors";
import { AggregateRoot } from "src/shared/domain";
import { ExperienceCreatedDomainEvent, ExperienceDeletedDomainEvent } from "./domain-events";

export class Experience extends AggregateRoot {
    constructor(
        private readonly _id: ID,
        private readonly _portfolioId: ID,
        public readonly company: String,
        public readonly position: String,
        public readonly achievements: String,
        public readonly startedAt: DateValueObject,
        public readonly endedAt: DateValueObject,
    ) {
        super();
    }

    delete() {
        this.registerEvent(ExperienceDeletedDomainEvent.create(this.id));
    }

    static fromJSON(json: Record<string, unknown>): Experience {
        if (!json.id || !json.portfolioId || !json.company || !json.position || !json.achievements || !json.startedAt || !json.endedAt) {
            throw ExperienceDomainError.InvalidJSON();
        }

        return new Experience(
            ID.create(json.id),
            ID.create(json.portfolioId),
            new String(json.company),
            new String(json.position),
            new String(json.achievements),
            DateValueObject.create(json.startedAt),
            DateValueObject.create(json.endedAt),
        );
    }

    static create(id: ID, portfolioId: ID, company: String, position: String, achievements: String, startDate: Date, endDate: Date): Experience {
        const user = new Experience(id, portfolioId, company, position, achievements, startDate, endDate);
        user.registerEvent(ExperienceCreatedDomainEvent.create(user.id));
        return user;
    }

    toJSON() {
        return {
            id: this.id,
            portfolioId: this.portfolioId,
            company: this.company.toString(),
            position: this.position.toString(),
            achievements: this.achievements.toString(),
            startedAt: this.startedAt.toISOString(),
            endedAt: this.endedAt.toISOString(),
        };
    }

    get id(): string {
        return this._id.value;
    }

    get portfolioId(): string {
        return this._portfolioId.value;
    }
}