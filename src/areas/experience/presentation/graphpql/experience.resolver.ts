import { ExperienceModel } from "./models";
import { Inject } from "@nestjs/common";
import { CreateExperienceInput } from "./inputs";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreatedModel, OperationStatusModel } from "src/shared/graphql";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ExperienceCreateCommand, ExperienceDeleteCommand } from "../../application/commands";    
import { ExperienceFindManyQuery } from '../../application/queries';


@Resolver(() => ExperienceModel)
export class ExperienceResolver {
    constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus, 
        @Inject(QueryBus) private readonly queryBus: QueryBus
    ) {}

    // @Query(() => [ExperienceModel], { name: 'experiences' })
    // async getExperiences(
    //     @Args('portfolioId', { type: () => String }) portfolioId: string
    // ) {
    //     const result = await this.queryBus.execute(ExperienceFindManyQuery.create(portfolioId));
    //     return result.unwrap().map(ExperienceModel.fromDto);
    // }

    // @Mutation(() => CreatedModel, { name: 'createExperience' })
    // async createExperience(
    //     @Args('input', { type: () => CreateExperienceInput }) input: CreateExperienceInput
    // ) {
    //     const result = await this.commandBus.execute(ExperienceCreateCommand.create(input));
    //     return CreatedModel.create(result.unwrap());
    // }

    // @Mutation(() => OperationStatusModel, { name: 'deleteExperience' })
    // async deleteExperience(
    //     @Args('experienceId', { type: () => String }) experienceId: string
    // ) {
    //     const result = await this.commandBus.execute(ExperienceDeleteCommand.create(experienceId));
    //     return OperationStatusModel.fromResult(result);
    // }
}
