import { Migration } from '@mikro-orm/migrations';

export class Migration20220108102717 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" drop constraint if exists "post_description_check";');
    this.addSql('alter table "post" alter column "description" type text using ("description"::text);');
    this.addSql('alter table "post" alter column "description" drop not null;');
  }

}
