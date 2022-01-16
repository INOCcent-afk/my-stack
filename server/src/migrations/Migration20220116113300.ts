import { Migration } from '@mikro-orm/migrations';

export class Migration20220116113300 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" rename column "user_id" to "creator_id";');
  }

}
