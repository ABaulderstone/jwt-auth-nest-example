import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dto/register.dto';
import { generateHash, validateHash } from 'src/shared/password';
import { Option } from 'fp-ts/lib/Option';
import * as O from 'fp-ts/lib/Option';
import { User } from 'src/users/entities/user.entity';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDTO): Promise<Option<User>> {
    const hashedPassword = await generateHash(data.password);
    const payload = { email: data.email, password: hashedPassword };
    const user = await this.userService.create(payload);
    return O.fromNullable(user);
  }

  async login(data: LoginDTO): Promise<Option<{ token: string }>> {
    const user = await this.userService.findByEmail(data.email);
    if (O.isNone(user)) return O.none;

    const isCorrect = await validateHash(data.password, user.value.password);
    if (!isCorrect) return O.none;
    const payload = { sub: user.value.id };
    const token = this.jwtService.sign(payload);
    return O.some({ token });
  }
}
