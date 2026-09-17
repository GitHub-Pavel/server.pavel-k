import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { PortfolioDto } from '../../../application/dtos';
import { SkillModel } from '../../../../skill';
import { ExperienceModel } from '../../../../experience';
import { ProjectModel } from '../../../../project';

@ObjectType('Portfolio', { description: 'Model of portfolio for GraphQL API' })
@Directive('@key(fields: "id")')
export class PortfolioModel {
  @Field(() => ID, { description: 'Unique identifier of portfolio' })
  id!: string;

  @Field(() => String, { description: 'Name of portfolio' })
  name!: string;

  @Field(() => String, { description: 'Description of portfolio' })
  description!: string;

  @Field(() => String, { description: 'Link to profile or external resource' })
  link!: string;

  @Field(() => [SkillModel], { description: 'Skills of portfolio' })
  skills!: SkillModel[];

  @Field(() => [ExperienceModel], { description: 'Experiences of portfolio' })
  experience!: ExperienceModel[];

  @Field(() => [ProjectModel], { description: 'Projects of portfolio' })
  projects!: ProjectModel[];

  static fromDto(portfolioDto: PortfolioDto): PortfolioModel {
    const model = new PortfolioModel();
    model.id = portfolioDto.id;
    model.name = portfolioDto.name;
    model.description = portfolioDto.description;
    model.link = portfolioDto.link;
    return model;
  }
}