import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProjectDto } from '../../../application/dtos';

@ObjectType('Project', { description: 'Model of project for GraphQL API' })
export class ProjectModel {
  @Field(() => ID, { description: 'Unique identifier of project' })
  id!: string;

  @Field(() => String, { description: 'Name of project' })
  name!: string;

  @Field(() => String, { description: 'Link of project' })
  link!: string;

  static fromDto(dto: ProjectDto): ProjectModel {
    const model = new ProjectModel();
    model.name = dto.name;
    model.link = dto.link;
    model.id = dto.id;
    return model;
  }
}