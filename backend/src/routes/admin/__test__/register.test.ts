import request from 'supertest';
import { app } from '../../../app';
import faker from 'faker';

describe('User registration', () => {
  const path = '/api/admin/register';

  it(`Has a router handler listening on ${path} for post requests`, async () => {
    const res = await request(app).post(path).send();

    expect(res.status).not.toEqual(404);
  });

  it('Returns a 401 if user is not authenticated', async () => {
    await request(app).post(path).send({}).expect(401);
  });

  it('Returns a 400 if no username is present in request body', async () => {
    const { cookie } = await global.createUser();

    await request(app)
      .post(path)
      .set('Cookie', cookie)
      .send({
        password: '123456',
      })
      .expect(400);
  });

  it('Returns a 400 if no password is present in request body', async () => {
    const { cookie } = await global.createUser();

    await request(app)
      .post(path)
      .set('Cookie', cookie)
      .send({
        username: faker.internet.userName(),
      })
      .expect(400);
  });

  it('Returns a 400 if a user with the username already exists', async () => {
    const { cookie } = await global.createUser();

    const username = faker.internet.userName();
    await request(app)
      .post(path)
      .set('Cookie', cookie)
      .send({
        username,
        password: faker.internet.password(),
      })
      .expect(201);

    await request(app)
      .post(path)
      .set('Cookie', cookie)
      .send({
        username,
        password: faker.internet.password(),
      })
      .expect(400);
  });

  it('Returns a 201 if a user is successfully created', async () => {
    const { cookie } = await global.createUser();
    await request(app)
      .post(path)
      .set('Cookie', cookie)
      .send({
        username: faker.internet.userName(),
        password: faker.internet.password(),
      })
      .expect(201);
  });
});
