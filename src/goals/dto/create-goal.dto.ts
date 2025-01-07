import { GoalType } from '@prisma/client';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(GoalType)
  @IsNotEmpty()
  type: GoalType;
}
