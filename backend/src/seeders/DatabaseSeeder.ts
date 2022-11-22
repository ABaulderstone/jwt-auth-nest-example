import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from 'src/users/entities/user.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = em.create(User, {
      email: 'test@test.com',
      password: 'password1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
