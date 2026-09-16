import { SkillModel } from "./models";
import { Inject } from "@nestjs/common";
import { CreateSkillInput } from "./inputs";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreatedModel, OperationStatusModel } from "src/shared/graphql";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { SkillCreateCommand, SkillDeleteCommand } from "../../application/commands";    
import { SkillFindManyQuery } from '../../application/queries';


@Resolver(() => SkillModel)
export class SkillResolver {
    constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus, 
        @Inject(QueryBus) private readonly queryBus: QueryBus
    ) {}

    @Query(() => [SkillModel], { name: 'skills' })
    async getSkills(
        @Args('portfolioId') portfolioId: string
    ) {
        const result = await this.queryBus.execute(SkillFindManyQuery.create(portfolioId));
        return result.unwrap().map(SkillModel.fromDto);
    }

    @Mutation(() => CreatedModel, { name: 'createSkill' })
    async createUser(
        @Args('input') input: CreateSkillInput
    ) {
        const skillResult = await this.commandBus.execute(SkillCreateCommand.create(input));
        return CreatedModel.create(skillResult.unwrap());
    }

    @Mutation(() => OperationStatusModel, { name: 'deleteSkill' })
    async deleteSkill(
        @Args('skillId') skillId: string
    ) {
        const result = await this.commandBus.execute(SkillDeleteCommand.create(skillId));
        return OperationStatusModel.fromResult(result);
    }
}
