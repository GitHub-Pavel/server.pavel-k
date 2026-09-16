import { SkillDto } from "../../dtos";
import { Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { Query } from "@nestjs/cqrs";

export class SkillFindManyQuery extends Query<Result<SkillDto[], AppError>> {
    constructor(public readonly portfolioId: string) {
        super();
    }

    static create(portfolioId: string): SkillFindManyQuery {
        return new SkillFindManyQuery(portfolioId);
    }
}