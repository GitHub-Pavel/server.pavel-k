import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsString, Length } from 'class-validator';

@InputType('CreateExperienceInput', { description: 'Data for creating a new experience' })
export class CreateExperienceInput {
  @Field(() => String, { description: 'Company of experience' })
  @IsString()
  @Length(2, 50)
  company!: string;

  @Field(() => String, { description: 'Position of experience' })
  @IsString()
  @Length(2, 50)
  position!: string;

  @Field(() => String, { description: 'Achievements of experience' })
  @IsString()
  @Length(2, 50)
  achievements!: string;

  @Field(() => Date, { description: 'Start date of experience' })
  @IsDate()
  startDate!: Date;

  @Field(() => Date, { description: 'End date of experience' })
  @IsDate()
  endDate!: Date;
}
