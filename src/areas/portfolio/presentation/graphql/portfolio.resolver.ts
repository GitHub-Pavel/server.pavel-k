import { Inject } from "@nestjs/common";
import { PortfolioModel } from "./models";
import { SkillModel } from '../../../skill';
import { CreatePortfolioInput } from "./inputs";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { SkillFindManyQuery } from '../../../skill';
import { CreatedModel, OperationStatusModel } from "src/shared/graphql";
import { PortfolioFindFirstQuery } from "../../application/queries";
import { PortfolioCreateCommand, PortfolioDeleteCommand } from "../../application/commands";
import { Args, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference } from "@nestjs/graphql";
import { ExperienceFindManyQuery, ExperienceModel } from "../../../experience";
import { ProjectFindManyQuery, ProjectModel } from "../../../project";


@Resolver(() => PortfolioModel)
export class PortfolioResolver {
    constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus, 
        @Inject(QueryBus) private readonly queryBus: QueryBus
    ) {}

    @ResolveReference()
    async resolveReference(reference: { __typename: string; id: string }) {
        return { id: reference.id };
    }

    @ResolveField(() => [SkillModel], { name: 'skills' })
    async orders(@Parent() portfolio: PortfolioModel) {
        const result = await this.queryBus.execute(SkillFindManyQuery.create(portfolio.id));
        return result.unwrap().map(SkillModel.fromDto);
    }

    @ResolveField(() => [ExperienceModel], { name: 'experience' })
    async experience(@Parent() portfolio: PortfolioModel) {
        const result = await this.queryBus.execute(ExperienceFindManyQuery.create(portfolio.id));
        return result.unwrap().map(ExperienceModel.fromDto);
    }

    @ResolveField(() => [ProjectModel], { name: 'projects' })
    async projects(@Parent() portfolio: PortfolioModel) {
        const result = await this.queryBus.execute(ProjectFindManyQuery.create(portfolio.id));
        return result.unwrap().map(ProjectModel.fromDto);
    }

    @Query(() => PortfolioModel, { name: 'portfolio' })
    async getPortgoflio() {
        const result = await this.queryBus.execute(PortfolioFindFirstQuery.create());
        return PortfolioModel.fromDto(result.unwrap());
    }

    // @Mutation(() => CreatedModel, { name: 'createPortfolio' })
    // async createUser(
    //     @Args('input', { type: () => CreatePortfolioInput }) input: CreatePortfolioInput
    // ) {
    //     const result = await this.commandBus.execute(PortfolioCreateCommand.create(input));
    //     return CreatedModel.create(result.unwrap());
    // }

    // @Mutation(() => OperationStatusModel, { name: 'deletePortfolio' })
    // async deletePortfolio() {
    //     const result = await this.commandBus.execute(PortfolioDeleteCommand.create());
    //     return OperationStatusModel.fromResult(result);
    // }
}
