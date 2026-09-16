import { ExperienceDto } from "../../dtos";
import { Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { Query } from "@nestjs/cqrs";

export class ExperienceFindManyQuery extends Query<Result<ExperienceDto[], AppError>> {
    constructor(public readonly portfolioId: string) {
        super();
    }

    static create(portfolioId: string): ExperienceFindManyQuery {
        return new ExperienceFindManyQuery(portfolioId);
    }
}