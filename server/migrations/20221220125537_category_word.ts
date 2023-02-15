import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('category_word', (table) => {
    table.increments();
    table.integer('category_id').references('category.id');
    table.string('keyword', 30);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('category');
}
