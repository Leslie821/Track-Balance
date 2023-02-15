import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('category', (table) => {
    table.increments();
    table.string('name', 30);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('category');
}
