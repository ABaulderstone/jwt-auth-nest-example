import { Entity, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/shared/base.entity';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property({ unique: true })
  email: string;

  @Property()
  @Exclude({ toPlainOnly: true })
  password: string;
}
