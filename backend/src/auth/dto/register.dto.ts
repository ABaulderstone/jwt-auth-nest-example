import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  passwordConfirmation: string;
}
