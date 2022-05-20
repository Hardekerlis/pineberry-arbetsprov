import request from 'supertest';
import { app } from '../../../app';
import faker from 'faker';

import { Competition } from '../../../models';

describe('Create competition', () => {
  const path = '/api/competition/create';

  it(`Has a router handler listening on ${path} for post requests`, async () => {
    const res = await request(app).post(path).send();

    expect(res.status).not.toEqual(404);
  });

  it('Returns a 401 if user is not authenticated', async () => {
    await request(app)
      .post(path)
      .send({
        name: faker.company.companyName(),
        timestamp: +new Date(),
        sex: 'male',
      })
      .expect(401);
  });

  it('Returns a 400 if name is not present in request body', async () => {
    const { cookie } = await global.createUser();

    await request(app)
      .post(path)
      .set('Cookie', cookie)
      .send({
        timestamp: +new Date(),
        sex: 'female',
      })
      .expect(400);
  });

  it('Returns a 400 if timestamp is not present in request body', async () => {
    const { cookie } = await global.createUser();

    await request(app)
      .post(path)
      .set('Cookie', cookie)
      .send({
        name: faker.company.companyName(),
        sex: 'female',
      })
      .expect(400);
  });

  it('Returns a 400 if sex is not present in request body', async () => {
    const { cookie } = await global.createUser();

    await request(app)
      .post(path)
      .set('Cookie', cookie)
      .send({
        name: faker.company.companyName(),
        timestamp: +new Date(),
      })
      .expect(400);
  });

  it('Returns a 201 if competition is successfully created', async () => {
    const { cookie } = await global.createUser();

    await request(app)
      .post(path)
      .set('Cookie', cookie)
      .send({
        name: faker.company.companyName(),
        timestamp: +new Date(),
        sex: 'female',
      })
      .expect(201);
  });

  it('Returns the new competition in response', async () => {
    const { cookie } = await global.createUser();

    const res = await request(app)
      .post(path)
      .set('Cookie', cookie)
      .send({
        name: faker.company.companyName(),
        timestamp: +new Date(),
        sex: 'female',
      })
      .expect(201);

    expect(res.body.competition).toBeDefined();
  });

  it('New competition is saved in database', async () => {
    const { cookie } = await global.createUser();

    const res = await request(app)
      .post(path)
      .set('Cookie', cookie)
      .send({
        name: faker.company.companyName(),
        timestamp: +new Date(),
        sex: 'female',
      })
      .expect(201);

    const competition = await Competition.findById(res.body.competition.id);

    expect(competition).toBeDefined();
  });
});
