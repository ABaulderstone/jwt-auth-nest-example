import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import BaseRepository from 'src/shared/base.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Option } from 'fp-ts/lib/Option';
import * as O from 'fp-ts/lib/Option';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: BaseRepository<User>,
  ) {}

  async findByEmail(email: string): Promise<Option<User>> {
    const user = await this.userRepository.findOne({ email });
    return O.fromNullable(user);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = plainToClass(User, createUserDto);
    await this.userRepository.persistAndFlush(newUser);
    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
