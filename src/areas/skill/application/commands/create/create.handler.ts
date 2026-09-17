import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { SkillCreateCommand } from "./create.command";
import { AsyncResult, Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { ISkillRepository } from "../../ports";
import { Inject } from "@nestjs/common";
import { Skill } from "../../../domain";
import { PortfolioFindFirstQuery } from "../../../../portfolio";
import { v7 } from "uuid";
import { ID } from "src/shared/value-objects";

@CommandHandler(SkillCreateCommand)
export class SkillCreateCommandHandler implements ICommandHandler<SkillCreateCommand, Result<string, AppError>> {
    constructor(
        @Inject(ISkillRepository) readonly skillRepo: ISkillRepository,
        @Inject(QueryBus) readonly queryBus: QueryBus
    ) {}

    async execute({ props }: SkillCreateCommand): AsyncResult<string, AppError> {
        const portfolioResult = await this.queryBus.execute(PortfolioFindFirstQuery.create());

        const skillResult = portfolioResult.map(portfolio => Skill.create(ID.create(v7()), ID.create(portfolio.id), props.name));

        if (skillResult.isErr && skillResult.error) {
            return Result.Err(skillResult.error);
        }

        const skill = skillResult.unwrap();
        await this.skillRepo.create(skill);
        return Result.Ok(skill.id);
    }
}