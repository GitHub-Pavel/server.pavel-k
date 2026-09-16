import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ExperienceFindManyQuery } from "./find-many.query";
import { IExperienceRepository } from "../../ports";
import { AsyncResult, Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { ExperienceDto } from "../../dtos";
import { Inject } from "@nestjs/common";

@QueryHandler(ExperienceFindManyQuery)
export class ExperienceFindManyHandler implements IQueryHandler<ExperienceFindManyQuery> {
    constructor(
        @Inject(IExperienceRepository) private readonly experienceRepo: IExperienceRepository
    ) {}

    async execute(query: ExperienceFindManyQuery): AsyncResult<ExperienceDto[], AppError> {
        const experiences = await this.experienceRepo.findManyById(query.portfolioId);
        return Result.Ok(experiences.map(ExperienceDto.fromDomain));
    }
}