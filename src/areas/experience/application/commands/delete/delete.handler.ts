import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ExperienceDeleteCommand } from "./delete.command";
import { AsyncResult, Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { IExperienceRepository } from "../../ports";
import { Inject } from "@nestjs/common";

@CommandHandler(ExperienceDeleteCommand)
export class ExperienceDeleteCommandHandler implements ICommandHandler<ExperienceDeleteCommand, Result<void, AppError>> {
    constructor(@Inject(IExperienceRepository) readonly experienceRepo: IExperienceRepository) {}

    async execute(query: ExperienceDeleteCommand): AsyncResult<void, AppError> {
        const experience = await this.experienceRepo.findById(query.experienceId);

        if (!experience) {
            return Result.Err(AppError.create('Experience not found'));
        }

        const result = Result.fromCatch<void, AppError>(() => experience.delete());

        if (result.isErr) {
            return result;
        }

        await this.experienceRepo.delete(experience);
        return Result.Ok();
    }
}