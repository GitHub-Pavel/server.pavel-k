import { Command } from "@nestjs/cqrs";
import { AppError } from "src/shared/app-error";
import { Result } from "src/shared/result";

export interface ExperienceCreateProps {
    company: string;
    position: string;
    achievements: string;
    startDate: Date;
    endDate: Date;
}

export class ExperienceCreateCommand extends Command<Result<string, AppError>> {
    private constructor(readonly props: ExperienceCreateProps) {
        super();
    }

    static create(props: ExperienceCreateProps): ExperienceCreateCommand {
        return new ExperienceCreateCommand(props);
    }
}