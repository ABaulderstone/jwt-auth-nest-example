import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from 'src/users/entities/user.entity';
import { generateHash } from '../shared/password';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const hashedPassword = await generateHash('password1');
    const user = em.create(User, {
      email: 'test@test.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
