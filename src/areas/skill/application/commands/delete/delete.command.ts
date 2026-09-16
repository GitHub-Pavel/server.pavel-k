import { Command } from "@nestjs/cqrs";
import { Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";

export class SkillDeleteCommand extends Command<Result<void, AppError>> {
    constructor(public readonly skillId: string) {
        super();
    }

    static create(skillId: string): SkillDeleteCommand {
        return new SkillDeleteCommand(skillId);
    }
}