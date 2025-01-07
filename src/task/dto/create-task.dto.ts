import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsNotEmpty()
  goalId: number; // Corresponds to the goal relation (foreign key).
}
