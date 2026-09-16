import { Command } from "@nestjs/cqrs";
import { AppError } from "src/shared/app-error";
import { Result } from "src/shared/result";

export interface ProjectCreateProps {
    name: string;
    link: string;   
}

export class ProjectCreateCommand extends Command<Result<string, AppError>> {
    private constructor(readonly props: ProjectCreateProps) {
        super();
    }

    static create(props: ProjectCreateProps): ProjectCreateCommand {
        return new ProjectCreateCommand(props);
    }
}