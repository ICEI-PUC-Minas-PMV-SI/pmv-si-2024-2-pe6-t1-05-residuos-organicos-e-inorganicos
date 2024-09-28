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
  /**
  * Teste para atualizar um usuário
  */
  it('Deve atualizar o usuário', async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${e2eToken}`)
      .send({
        name: 'Usuário Atualizado',
      });
      
    expect(res.statusCode).toEqual(200);
  });
});
