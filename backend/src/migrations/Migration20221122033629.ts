import { Migration } from '@mikro-orm/migrations';

export class Migration20221122033629 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `users` add unique `users_email_unique`(`email`);');
  }

  async down(): Promise<void> {
    this.addSql('alter table `users` drop index `users_email_unique`;');
  }

}
