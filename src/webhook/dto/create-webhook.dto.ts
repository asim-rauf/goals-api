import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateWebhookDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  avatar?: string;

  @IsNotEmpty()
  @IsDate()
  lastLogin: Date;
}
