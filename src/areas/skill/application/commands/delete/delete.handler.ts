import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SkillDeleteCommand } from "./delete.command";
import { AsyncResult, Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { ISkillRepository } from "../../ports";
import { Inject } from "@nestjs/common";

@CommandHandler(SkillDeleteCommand)
export class SkillDeleteCommandHandler implements ICommandHandler<SkillDeleteCommand, Result<void, AppError>> {
    constructor(@Inject(ISkillRepository) readonly skillRepo: ISkillRepository) {}

    async execute(query: SkillDeleteCommand): AsyncResult<void, AppError> {
        const skill = await this.skillRepo.findById(query.skillId);

        if (!skill) {
            return Result.Err(AppError.create('Skill not found'));
        }

        const result = Result.fromCatch<void, AppError>(() => skill.delete());

        if (result.isErr) {
            return result;
        }

        await this.skillRepo.delete(skill);
        return Result.Ok();
    }
}