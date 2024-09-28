// e2e/users.e2e.test.ts
import request from 'supertest';
import { app } from '../src/app';
import { e2eToken } from '../tests/utils';

import knex from '../src/database/connection';

beforeAll(async () => {
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
});

afterAll(async () => {
  await knex.destroy();
});

describe('Users API Endpoints', () => {
  let userId: number;
});
