import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProjectFindManyQuery } from "./find-many.query";
import { Inject } from "@nestjs/common";
import { IProjectRepository } from "../../ports";
import { AsyncResult, Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { ProjectDto } from "../../dtos";

@QueryHandler(ProjectFindManyQuery)
export class ProjectFindManyHandler implements IQueryHandler<ProjectFindManyQuery> {
    constructor(
        @Inject(IProjectRepository) private readonly projectRepo: IProjectRepository
    ) {}

    async execute(query: ProjectFindManyQuery): AsyncResult<ProjectDto[], AppError> {
        const projects = await this.projectRepo.findManyById(query.portfolioId);
        return Result.Ok(projects.map(ProjectDto.fromDomain));
    }
}