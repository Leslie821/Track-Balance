import { Injectable } from '@nestjs/common';
import { knex } from './../../db';

@Injectable()
export class UserService {

    async confirmLogin(body) {
        try {
            await knex
                .select('email').from('users').where('email', '=', body.email);

            await knex
                .select('password').from('users').where('password', '=', body.password);

            return { status: "success" }

        } catch (err) {
            return err
        }
    }

    async register(body) {
        try {
            const query = await knex("users").insert(
                {
                    email: body.email,
                    password: body.password,
                    name: body.name,
                }
            )
            return query
        } catch (err) {
            return err
        }
    }
}
