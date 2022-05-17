import request from 'supertest';
import { app } from '../../../app';
import faker from 'faker';

describe('User registration', () => {
  const path = '/api/admin/login';

  it(`Has a router handler listening on ${path} for post requests`, async () => {
    const res = await request(app).post(path).send();

    expect(res.status).not.toEqual(404);
  });

  it('Returns a 400 if username is not present in request body', async () => {
    await request(app)
      .post(path)
      .send({
        password: faker.internet.password(),
      })
      .expect(400);
  });

  it('Returns a 400 if password is not present in request body', async () => {
    await request(app)
      .post(path)
      .send({
        username: faker.internet.userName(),
      })
      .expect(400);
  });

  it("Returns 'Not authorized' if password or username is wrong", async () => {
    const { user, password } = await global.createUser();

    const wrongPassRes = await request(app)
      .post(path)
      .send({
        username: user.username,
        password: '123456',
      })
      .expect(401);

    const wrongUsernameRes = await request(app)
      .post(path)
      .send({
        username: faker.internet.userName(),
        password: password,
      })
      .expect(401);

    expect(wrongPassRes.body.errors[0].message).toEqual(
      wrongUsernameRes.body.errors[0].message,
    );
  });

  it('Returns a 200 if login is successful', async () => {
    const { user, password } = await global.createUser();

    await request(app)
      .post(path)
      .send({
        username: user.username,
        password,
      })
      .expect(200);
  });

  it('Returns an auth cookie if login is successful', async () => {
    const { user, password } = await global.createUser();

    const res = await request(app)
      .post(path)
      .send({
        username: user.username,
        password,
      })
      .expect(200);

    expect(res.get('Set-Cookie')).toBeDefined();
  });
});
