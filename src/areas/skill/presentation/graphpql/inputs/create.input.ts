import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType('CreateSkillInput', { description: 'Data for creating a new skill' })
export class CreateSkillInput {
  @Field(() => String, { description: 'Name of skill' })
  @IsString()
  @Length(2, 50)
  name!: string;
}
