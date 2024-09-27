import request from 'supertest';
import { app } from '../src/app';
import { e2eToken } from '../tests/utils';

describe('Items Endpoints', () => {
  it('Deve retornar a lista de itens', async () => {
    const res = await request(app)
      .get('/items')
      .set('Authorization', `Bearer ${e2eToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
