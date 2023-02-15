/* eslint-disable prettier/prettier */
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('name', 255);
    table.string('password', 100);
    table.string('email', 255);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}

