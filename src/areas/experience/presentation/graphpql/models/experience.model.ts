import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ExperienceDto } from '../../../application/dtos';

@ObjectType('Experience', { description: 'Model of experience for GraphQL API' })
export class ExperienceModel {
  @Field(() => ID, { description: 'Unique identifier of experience' })
  id!: string;

  @Field(() => String, { description: 'Company of experience' })
  company!: string;

  @Field(() => String, { description: 'Position of experience' })
  position!: string;

  @Field(() => String, { description: 'Achievements of experience' })
  achievements!: string;

  @Field(() => Date, { description: 'Start date of experience' })
  startedAt!: Date;

  @Field(() => Date, { description: 'End date of experience' })
  endedAt!: Date;

  static fromDto(dto: ExperienceDto): ExperienceModel {
    const model = new ExperienceModel();
    model.company = dto.company;
    model.position = dto.position;
    model.achievements = dto.achievements;
    model.startedAt = dto.startedAt;
    model.endedAt = dto.endedAt;
    model.id = dto.id;
    return model;
  }
}