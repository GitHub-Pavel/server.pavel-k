import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProjectDeleteCommand } from "./delete.command";
import { AsyncResult, Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { IProjectRepository } from "../../ports";
import { Inject } from "@nestjs/common";

@CommandHandler(ProjectDeleteCommand)
export class ProjectDeleteCommandHandler implements ICommandHandler<ProjectDeleteCommand, Result<void, AppError>> {
    constructor(@Inject(IProjectRepository) readonly projectRepo: IProjectRepository) {}

    async execute(query: ProjectDeleteCommand): AsyncResult<void, AppError> {
        const project = await this.projectRepo.findById(query.projectId);

        if (!project) {
            return Result.Err(AppError.create('Project not found'));
        }

        const result = Result.fromCatch<void, AppError>(project.delete);

        if (result.isErr) {
            return result;
        }

        await this.projectRepo.delete(project);
        return Result.Ok();
    }
}