import { Command } from "@nestjs/cqrs";
import { AppError } from "src/shared/app-error";
import { Result } from "src/shared/result";

export interface SkillCreateProps {
    name: string;
}

export class SkillCreateCommand extends Command<Result<string, AppError>> {
    private constructor(readonly props: SkillCreateProps) {
        super();
    }

    static create(props: SkillCreateProps): SkillCreateCommand {
        return new SkillCreateCommand(props);
    }
}