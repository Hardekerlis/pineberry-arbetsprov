import request from 'supertest';
import { app } from '../../../app';
import faker from 'faker';
import mongoose from 'mongoose';

describe('Fetch one competition', () => {
  const path = (id) => {
    return `/api/competition/${id}`;
  };

  it(`Has a router handler listening on ${path(
    'example',
  )} for get requests`, async () => {
    const competition = await global.createCompetition();

    const res = await request(app).get(path(competition.id)).send();

    expect(res.status).not.toEqual(404);
  });

  it('Returns a 404 if competiton id is a invalid mongodb id', async () => {
    const res = await request(app).get(path('test')).send();

    expect(res.status).toEqual(404);
  });

  it('Returns a 404 if no competition is found', async () => {
    const res = await request(app)
      .get(path(new mongoose.Types.ObjectId()))
      .send();

    expect(res.status).toEqual(404);
  });

  it('Returns a 200 if a competition is found', async () => {
    const competition = await global.createCompetition();

    await request(app).get(path(competition.id)).send().expect(200);
  });

  it('Returns a competiton if one is found', async () => {
    const competition = await global.createCompetition();

    const res = await request(app).get(path(competition.id)).send().expect(200);

    expect(res.body.competition).toBeDefined();
  });

  it('Participants is populated if fetch is successful', async () => {
    const competition = await global.createCompetition();

    const { cookie } = await global.createUser();

    await request(app)
      .post(`/api/participants/${competition.id}`)
      .set('Cookie', cookie)
      .send({
        name: faker.name.firstName(),
        number: '1',
      })
      .expect(201);

    const res = await request(app).get(path(competition.id)).send().expect(200);

    expect(res.body.competition.participants[0].name).toBeDefined();
  });
});

describe('Fetch many competitions', () => {
  const path = '/api/competition';

  it(`Has a router handler listening on ${path} for get requests`, async () => {
    const competition = await global.createCompetition();
    const res = await request(app).get(path).send();

    expect(res.status).not.toEqual(404);
  });

  it('Returns a 404 if no competitions are found', async () => {
    const res = await request(app).get(path).send().expect(404);
  });

  it('Returns a 200 if competitions are found', async () => {
    const competition = await global.createCompetition();
    await request(app).get(path).send().expect(200);
  });

  it('Returns 3 competitions if thats how many exists', async () => {
    for (const i in Array.apply(null, Array(3))) {
      await global.createCompetition();
    }

    const res = await request(app).get(path).send().expect(200);

    expect(res.body.competitions.length).toEqual(3);
  });
});
