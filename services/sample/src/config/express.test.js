import request from 'supertest';
import server from '../server';

afterAll(() => {
  server.close();
});

describe('Route top level', () => {
  it('Should respond as OK', async() => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('text/html');
    // expect(response.body).toEqual('ok');
  });
});
