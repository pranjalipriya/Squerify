import { IsEmail, IsString } from 'class-validator';
import { Unique } from 'typeorm';

@Unique(['username'])
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
