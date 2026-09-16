import { Command } from "@nestjs/cqrs";
import { Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";

export class ExperienceDeleteCommand extends Command<Result<void, AppError>> {
    constructor(public readonly experienceId: string) {
        super();
    }

    static create(experienceId: string): ExperienceDeleteCommand {
        return new ExperienceDeleteCommand(experienceId);
    }
}