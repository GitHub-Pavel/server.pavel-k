import { ProjectDto } from "../../dtos";
import { Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { Query } from "@nestjs/cqrs";

export class ProjectFindManyQuery extends Query<Result<ProjectDto[], AppError>> {
    constructor(public readonly portfolioId: string) {
        super();
    }

    static create(portfolioId: string): ProjectFindManyQuery {
        return new ProjectFindManyQuery(portfolioId);
    }
}