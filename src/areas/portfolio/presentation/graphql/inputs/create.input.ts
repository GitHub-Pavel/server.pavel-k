import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length, IsUrl, MinLength } from 'class-validator';

@InputType('CreatePortfolioInput', { description: 'Data for creating a new portfolio' })
export class CreatePortfolioInput {
  @Field(() => String, { description: 'Name of portfolio' })
  @IsString()
  @Length(2, 50)
  name!: string;

  @Field(() => String, { description: 'Description of portfolio' })
  @IsString()
  @MinLength(20)
  description!: string;

  @Field(() => String, { description: 'Link to website or social network' })
  @IsUrl()
  link!: string;
}
