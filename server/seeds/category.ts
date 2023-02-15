import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('category').del();
  await knex('category_word').del();

  const dataArr: Array<{ id: number }> = await knex
    .insert([
      {
        name: 'food',
      },
      {
        name: 'daily',
      },
      {
        name: 'entertainment',
      },
    ])
    .into('category')
    .returning('id');

  console.log(dataArr);

  await knex()
    .insert([
      {
        category_id: dataArr[0].id,
        keyword: '叻沙',
      },
      {
        category_id: dataArr[0].id,
        keyword: '飯',
      },
      {
        category_id: dataArr[0].id,
        keyword: '麵',
      },
    ])
    .into('category_word');
}
