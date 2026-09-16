import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SkillDto } from '../../../application/dtos';

@ObjectType('Skill', { description: 'Model of skill for GraphQL API' })
export class SkillModel {
  @Field(() => ID, { description: 'Unique identifier of skill' })
  id!: string;

  @Field(() => String, { description: 'Name of skill' })
  name!: string;

  static fromDto(dto: SkillDto): SkillModel {
    const model = new SkillModel();
    model.name = dto.name;
    model.id = dto.id;
    return model;
  }
}