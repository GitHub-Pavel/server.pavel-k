import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { ProjectCreateCommand } from "./create.command";
import { AsyncResult, Result } from "src/shared/result";
import { AppError } from "src/shared/app-error";
import { IProjectRepository } from "../../ports";
import { Inject } from "@nestjs/common";
import { Project } from "../../../domain";
import { PortfolioFindFirstQuery } from "../../../../portfolio";
import { v7 } from "uuid";
import { ID } from "src/shared/value-objects";

@CommandHandler(ProjectCreateCommand)
export class ProjectCreateCommandHandler implements ICommandHandler<ProjectCreateCommand, Result<string, AppError>> {
    constructor(
        @Inject(IProjectRepository) readonly projectRepo: IProjectRepository,
        @Inject(QueryBus) readonly queryBus: QueryBus
    ) {}

    async execute({ props }: ProjectCreateCommand): AsyncResult<string, AppError> {
        const portfolioResult = await this.queryBus.execute(PortfolioFindFirstQuery.create());

        const projectResult = portfolioResult.map(
            portfolio => Project.create(ID.create(v7()), ID.create(portfolio.id), props.name, props.link)
        );

        if (projectResult.isErr && projectResult.error) {
            return Result.Err(projectResult.error);
        }

        const project = projectResult.unwrap();
        await this.projectRepo.create(project);
        return Result.Ok(project.id);
    }
}