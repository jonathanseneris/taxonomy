import { Migration } from '@mikro-orm/migrations';

export class Migration20231212051453 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" alter column "email" type varchar(255) using ("email"::varchar(255));');
    this.addSql('alter table "user" alter column "email" drop not null;');
    this.addSql('alter table "user" alter column "name" type varchar(255) using ("name"::varchar(255));');
    this.addSql('alter table "user" alter column "name" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" alter column "email" type varchar using ("email"::varchar);');
    this.addSql('alter table "user" alter column "email" set not null;');
    this.addSql('alter table "user" alter column "name" type varchar using ("name"::varchar);');
    this.addSql('alter table "user" alter column "name" set not null;');
  }

}
