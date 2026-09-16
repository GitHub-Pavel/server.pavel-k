import { ProjectModel } from "./models";
import { Inject } from "@nestjs/common";
import { CreateProjectInput } from "./inputs";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreatedModel, OperationStatusModel } from "src/shared/graphql";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProjectCreateCommand, ProjectDeleteCommand } from "../../application/commands";    
import { ProjectFindManyQuery } from '../../application/queries';


@Resolver(() => ProjectModel)
export class ProjectResolver {
    constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus, 
        @Inject(QueryBus) private readonly queryBus: QueryBus
    ) {}

    @Query(() => [ProjectModel], { name: 'projects' })
    async getProjects(
        @Args('portfolioId') portfolioId: string
    ) {
        const result = await this.queryBus.execute(ProjectFindManyQuery.create(portfolioId));
        return result.unwrap().map(ProjectModel.fromDto);
    }

    @Mutation(() => CreatedModel, { name: 'createProject' })
    async createUser(
        @Args('input') input: CreateProjectInput
    ) {
        const projectResult = await this.commandBus.execute(ProjectCreateCommand.create(input));
        return CreatedModel.create(projectResult.unwrap());
    }

    @Mutation(() => OperationStatusModel, { name: 'deleteProject' })
    async deleteSkill(
        @Args('projectId') projectId: string
    ) {
        const result = await this.commandBus.execute(ProjectDeleteCommand.create(projectId));
        return OperationStatusModel.fromResult(result);
    }
}
