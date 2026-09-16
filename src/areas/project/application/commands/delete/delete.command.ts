import { Command } from "@nestjs/cqrs";
import { Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
    
export class ProjectDeleteCommand extends Command<Result<void, AppError>> {
    constructor(public readonly projectId: string) {
        super();
    }

    static create(projectId: string): ProjectDeleteCommand {
        return new ProjectDeleteCommand(projectId);
    }
}