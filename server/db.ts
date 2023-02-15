/* eslint-disable prettier/prettier */
import Knex from 'knex';
import { env } from './env'


// eslint-disable-next-line @typescript-eslint/no-var-requires
const profiles = require('./knexfile')
const config = profiles[env.NODE_ENV]

export const knex = Knex(config)