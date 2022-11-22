import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import * as O from 'fp-ts/Option';
import { instanceToPlain } from 'class-transformer';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() data: RegisterDTO): Promise<object> {
    const maybeUser = await this.authService.register(data);
    if (O.isNone(maybeUser)) {
      throw new HttpException('Failed to create User', HttpStatus.BAD_REQUEST);
    }
    return instanceToPlain(maybeUser.value);
  }

  @Post('/login')
  async login(@Body() data: LoginDTO): Promise<{ token: string }> {
    const result = await this.authService.login(data);

    if (O.isNone(result)) {
      throw new HttpException(
        'Wrong Email or Password',
        HttpStatus.BAD_REQUEST,
      );
    }

    return result.value;
  }
}
