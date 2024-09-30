import path from 'path';
import request from 'supertest';
import { app } from '../src/app';
import knex from '../src/database/connection';
import { e2eToken } from '../tests/utils';

beforeAll(async () => {
  await knex.raw('TRUNCATE TABLE point_items, points RESTART IDENTITY CASCADE');
});

afterAll(async () => {
  await knex.destroy();
});

describe('Points E2E', () => {
  it('Deve criar um novo ponto', async () => {
    const response = await request(app)
      .post('/points')
      .attach('image', path.resolve(__dirname, '..', 'tests', 'test-image.jpg'))
      .field('name', 'Ponto de Teste')
      .field('email', 'teste@teste.com')
      .field('whatsapp', '123456789')
      .field('latitude', '-23.565656')
      .field('longitude', '-46.565656')
      .field('city', 'São Paulo')
      .field('uf', 'SP')
      .field('items', '1,2,3')
      .set('Authorization', `Bearer ${e2eToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve listar pontos com filtros de cidade, UF e itens', async () => {
    const response = await request(app)
      .get('/points')
      .query({
        city: 'São Paulo',
        uf: 'SP',
        items: '1,2'
      })
      .set('Authorization', `Bearer ${e2eToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.pagination).toHaveProperty('totalItems');
    expect(response.body.pagination).toHaveProperty('totalPages');
  });

  it('Deve retornar um ponto específico', async () => {
    const response = await request(app)
      .get('/points/1')
      .set('Authorization', `Bearer ${e2eToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('point');
    expect(response.body.items).toBeInstanceOf(Array);
  });

  it('Deve atualizar um ponto existente', async () => {
    const response = await request(app)
      .put('/points/1')
      .field('name', 'Ponto de Teste Atualizado')
      .set('Authorization', `Bearer ${e2eToken}`);

    expect(response.status).toBe(200);
  });

  it('Deve deletar um ponto existente', async () => {
    const response = await request(app)
      .delete('/points/1')
      .set('Authorization', `Bearer ${e2eToken}`);

    expect(response.status).toBe(204);
  });
});
