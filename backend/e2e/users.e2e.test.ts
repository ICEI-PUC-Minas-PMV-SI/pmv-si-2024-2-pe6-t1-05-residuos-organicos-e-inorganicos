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
  /**
  * Teste para deletar um usuário
  */
  it('Deve deletar o usuário', async () => {
    const res = await request(app)
      .delete(/users/${userId})
      .set('Authorization', Bearer ${e2eToken});
    
    expect(res.statusCode).toEqual(204);
  });

  /**
   * Teste para listar usuários (com paginação)
   */
  it('Deve retornar a lista de usuários', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', Bearer ${e2eToken})
      .query({ page: 1, limit: 10 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toBeInstanceOf(Array);
  });
});
