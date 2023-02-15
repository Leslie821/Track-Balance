import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('money', (table) => {
    table.increments();
    table.integer('users_id').references('users.id').unsigned();
    table.string('type', 30);
    table.integer('amount');
    table.string('photo', 255);
    table.string('account', 30);
    table.date('date');
    table.string('remark', 255);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('money');
}

