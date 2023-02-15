/* eslint-disable prettier/prettier */

// import { config } from 'dotenv';
import populateENV from 'populate-env';

import * as dotenv from 'dotenv';
dotenv.config();

// eslint-disable-next-line prefer-const
export let env = {
  NODE_ENV: 'development',
  DB_NAME: 'project3',
  DB_USER: 'admin',
  DB_PASSWORD: 'admin',
};

populateENV(env, { mode: 'halt' });
