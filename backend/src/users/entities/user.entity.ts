import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/shared/base.entity';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property({ unique: true })
  email: string;

  @Property()
  password: string;
}
