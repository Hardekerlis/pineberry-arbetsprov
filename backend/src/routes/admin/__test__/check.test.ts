import request from 'supertest';
import { app } from '../../../app';
import faker from 'faker';

describe('User registration', () => {
  const path = '/api/admin/check';

  it(`Has a router handler listening on ${path} for get requests`, async () => {
    const res = await request(app).get(path).send();

    expect(res.status).not.toEqual(404);
  });

  it('Returns a 401 if user is not authenticated', async () => {
    await request(app).get(path).send().expect(401);
  });

  it('Returns a 200 if user is authenticated', async () => {
    const { cookie } = await global.createUser();

    await request(app).get(path).set('Cookie', cookie).send().expect(200);
  });
});
