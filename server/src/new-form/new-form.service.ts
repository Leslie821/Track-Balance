/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { InjectModel } from 'nest-knexjs';
// need down nestjs-knex
// import { Knex } from 'knex';
import { Knex } from 'nestjs-knex';

@Injectable()
export class NewFormService {
  constructor(@InjectModel() private knex: Knex) { }
  async createNewFrom(formInfo: {
    date: Date;
    amount: number;
    type: string;
    account: string;
    remark: string;
    id: number;
  }) {
    try {
      let result = await this.knex('money')
        .update({
          users_id: '1',
          type: formInfo.type,
          amount: formInfo.amount,
          account: formInfo.account,
          date: formInfo.date,
          remark: formInfo.remark,
        })
        .where('id', '=', formInfo.id);

      return result;
    } catch (err) {
      return err
    }
  }
  async PictoDb(photoPaths: string[]) {
    let rows = await this.knex('money')
      .insert(photoPaths.map((photo) => ({ photo })))
      .returning('id');
    return rows;
  }
}
