import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'nestjs-knex';
@Injectable()
export class SelectDateService {
  constructor(@InjectModel() private knex: Knex) { }
  async getDateAmount(dateAmount: object) {
    try {

      let result = await this.knex('money')
        .select('*')
        .where({ date: dateAmount })
        .andWhere(function () {
          this.where('users_id', '=', 1);
        });

      return result;
    } catch (err) {
      return err
    }
  }
}
