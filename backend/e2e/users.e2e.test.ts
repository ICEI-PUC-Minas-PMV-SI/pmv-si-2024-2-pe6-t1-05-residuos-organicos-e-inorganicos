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
   * Teste para criar um novo usuário
   */
  it('Deve criar um novo usuário', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Usuário Teste',
        email: `teste@example.com`,
        password: 'senha123',
      });

    expect(res.statusCode).toEqual(201);

    userId = res.body.id;
  });

  /**
   * Teste para autenticar o usuário e obter um token JWT
   */
  it('Deve autenticar o usuário e retornar um token', async () => {
    const res = await request(app)
      .post('/users/auth')
      .send({
        email: 'teste@example.com',
        password: 'senha123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  /**
   * Teste para listar usuários (com paginação)
   */
  it('Deve retornar a lista de usuários', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${e2eToken}`)
      .query({ page: 1, limit: 10 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toBeInstanceOf(Array);
  });

  /**
   * Teste para obter um usuário específico
   */
  it('Deve obter os detalhes de um usuário', async () => {
    const res = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${e2eToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
  });

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
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${e2eToken}`);

    expect(res.statusCode).toEqual(204);
  });
});