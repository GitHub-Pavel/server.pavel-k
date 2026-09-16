import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType('CreateProjectInput', { description: 'Data for creating a new project' })
export class CreateProjectInput {
  @Field(() => String, { description: 'Name of project' })
  @IsString()
  @Length(2, 50)
  name!: string;

  @Field(() => String, { description: 'Link of project' })
  @IsString()
  @Length(2, 255)
  link!: string;
}
