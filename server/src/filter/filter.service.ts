import { Injectable } from '@nestjs/common';
import { Knex } from 'nestjs-knex';
import { InjectModel } from 'nest-knexjs';
@Injectable()
export class FilterService {
  constructor(@InjectModel() private knex: Knex) { }

  async getDate() {
    try {
      let result = await this.knex.raw(
        `SELECT date,photo FROM money WHERE users_id=?`,
        [1],
      );
      return result.rows;
    } catch (err) {
      return err
    }
  }

  async getType() {
    try {
      let result = await this.knex.raw(
        `SELECT type,photo FROM money WHERE users_id=?`,
        [1],
      );
      return result.rows;
    } catch (err) {
      return err
    }
  }

  async getAmount() {
    try {
      let result = await this.knex.raw(
        `SELECT amount,photo FROM money WHERE users_id=?`,
        [1],
      );
      return result.rows;
    } catch (err) {
      return err
    }
  }
}
