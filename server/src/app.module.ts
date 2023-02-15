/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NewFormModule } from './new-form/new-form.module';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { FilterModule } from './filter/filter.module';
import { env } from '../env';
import { KnexModule } from 'nest-knexjs';
import { SelectDateModule } from './select-date/select-date.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        connection: {
          database: env.DB_NAME,
          user: env.DB_USER,
          password: env.DB_PASSWORD,
        },
        pool: {
          min: 2,
          max: 10,
        },
        migrations: {
          tableName: 'knex_migrations',
        },
      },
    }),
    NewFormModule,
    UserModule,
    StudentModule,
    FilterModule,
    SelectDateModule,
  ],
  controllers: [],
})
export class AppModule {}
