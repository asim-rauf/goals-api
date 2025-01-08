import { GoalType } from '@prisma/client';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  userId: string;
}
