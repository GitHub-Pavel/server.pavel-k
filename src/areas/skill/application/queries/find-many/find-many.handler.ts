import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SkillFindManyQuery } from "./find-many.query";
import { Inject } from "@nestjs/common";
import { ISkillRepository } from "../../ports";
import { AsyncResult, Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { SkillDto } from "../../dtos";

@QueryHandler(SkillFindManyQuery)
export class SkillFindManyHandler implements IQueryHandler<SkillFindManyQuery> {
    constructor(
        @Inject(ISkillRepository) private readonly skillRepo: ISkillRepository
    ) {}

    async execute(query: SkillFindManyQuery): AsyncResult<SkillDto[], AppError> {
        const skills = await this.skillRepo.findManyById(query.portfolioId);
        return Result.Ok(skills.map(SkillDto.fromDomain));
    }
}