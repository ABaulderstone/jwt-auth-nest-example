import { Migration } from '@mikro-orm/migrations';

export class Migration20221122033524 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `users` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `email` varchar(255) not null, `password` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
  }

}
