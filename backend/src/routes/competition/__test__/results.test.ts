import request from 'supertest';
import { app } from '../../../app';
import faker from 'faker';
import mongoose from 'mongoose';

describe('Fetch one competition', () => {
  const path = '/api/competition/results';

  it(`Has a router handler listening on ${path} for post requests`, async () => {
    const res = await request(app).post(path).send();

    expect(res.status).not.toEqual(404);
  });

  it('Returns a 401 if user is not authenticated', async () => {
    await request(app).post(path).send().expect(401);
  });

  it('returns a 400 if competitionId is not defined in request body', async () => {
    const { cookie } = await global.createUser();

    await request(app)
      .post(path)
      .set('Cookie', cookie)
      .send({
        values: [{}],
      })
      .expect(400);
  });

  it('Returns a 400 if values is not defined in request body', async () => {
    const { cookie } = await global.createUser();
    const competiton = await global.createCompetition();

    await request(app)
      .post(path)
      .set('Cookie', cookie)
      .send({
        competitionId: competiton.id,
      })
      .expect(400);
  });

  it('Returns a 400 if userIds are not defined in request body', async () => {
    const { cookie } = await global.createUser();
    const competiton = await global.createCompetition();

    await request(app)
      .post(path)
      .set('Cookie', cookie)
      .send({
        competitionId: competiton.id,
        values: [
          {
            userId: user.id,
            value: '123123',
            event: 'längdhopp',
          },
        ],
      })
      .expect(400);
  });

  it('Returns a 201 if data is successfully inserted into the database', async () => {
    const { cookie, user } = await global.createUser();
    const competiton = await global.createCompetition();

    await request(app)
      .post(path)
      .set('Cookie', cookie)
      .send({
        competitionId: competiton.id,
        values: [
          {
            userId: user.id,
            value: '123123',
            event: 'längdhopp',
          },
        ],
        userIds: [user.id],
      })
      .expect(201);
  });
});
