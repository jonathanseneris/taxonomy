'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20240819050805 extends Migration {

  async up() {
    this.addSql('create table "tag_user" ("tag_id" varchar(255) not null, "tag_name" varchar(255) not null, "user_id" varchar(255) not null, constraint "tag_user_pkey" primary key ("tag_id", "tag_name", "user_id"));');

    this.addSql('create table "tag_submission" ("tag_id" varchar(255) not null, "tag_name" varchar(255) not null, "work_id" varchar(255) not null, constraint "tag_submission_pkey" primary key ("tag_id", "tag_name", "work_id"));');

    this.addSql('create table "work_tags" ("work_id" varchar(255) not null, "tag_id" varchar(255) not null, "tag_name" varchar(255) not null, constraint "work_tags_pkey" primary key ("work_id", "tag_id", "tag_name"));');

    this.addSql('alter table "tag_user" add constraint "tag_user_tag_id_tag_name_foreign" foreign key ("tag_id", "tag_name") references "tag" ("id", "name") on update cascade on delete cascade;');
    this.addSql('alter table "tag_user" add constraint "tag_user_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "tag_submission" add constraint "tag_submission_tag_id_tag_name_foreign" foreign key ("tag_id", "tag_name") references "tag" ("id", "name") on update cascade on delete cascade;');
    this.addSql('alter table "tag_submission" add constraint "tag_submission_work_id_foreign" foreign key ("work_id") references "work" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "work_tags" add constraint "work_tags_work_id_foreign" foreign key ("work_id") references "work" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "work_tags" add constraint "work_tags_tag_id_tag_name_foreign" foreign key ("tag_id", "tag_name") references "tag" ("id", "name") on update cascade on delete cascade;');

    this.addSql('alter table "tag" drop constraint "tag_submission_id_foreign";');
    this.addSql('alter table "tag" drop constraint "tag_user_id_foreign";');

    this.addSql('alter table "tag" drop column "user_id", drop column "submission_id";');
  }

  async down() {
    this.addSql('drop table if exists "tag_user" cascade;');

    this.addSql('drop table if exists "tag_submission" cascade;');

    this.addSql('drop table if exists "work_tags" cascade;');

    this.addSql('alter table "tag" add column "user_id" varchar(255) not null, add column "submission_id" varchar(255) not null;');
    this.addSql('alter table "tag" add constraint "tag_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete no action;');
    this.addSql('alter table "tag" add constraint "tag_submission_id_foreign" foreign key ("submission_id") references "work" ("id") on update cascade on delete no action;');
  }

}
exports.Migration20240819050805 = Migration20240819050805;
