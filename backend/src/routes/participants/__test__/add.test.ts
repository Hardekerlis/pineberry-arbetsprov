import request from 'supertest';
import { app } from '../../../app';
import faker from 'faker';
import mongoose from 'mongoose';

import { Competition } from '../../../models';

describe('Create competition', () => {
  const path = (id) => {
    return `/api/participants/${id}`;
  };

  it(`Has a router handler listening on ${path(
    'example',
  )} for post requests`, async () => {
    const competition = await global.createCompetition();
    const res = await request(app).post(path(competition.id)).send();

    expect(res.status).not.toEqual(404);
  });

  it('Returns a 404 if competition is not found', async () => {
    const { cookie } = await global.createUser();

    await request(app)
      .post(path(new mongoose.Types.ObjectId()))
      .set('Cookie', cookie)
      .send({
        name: faker.name.firstName(),
        number: '1',
      })
      .expect(404);
  });

  it('Returns a 401 if user is not authenticated', async () => {
    const competition = await global.createCompetition();

    await request(app)
      .post(path(competition.id))
      .send({
        name: faker.name.firstName(),
        number: '1',
      })
      .expect(401);
  });

  it('Returns a 400 if name is not present in request body', async () => {
    const competition = await global.createCompetition();
    const { cookie } = await global.createUser();

    await request(app)
      .post(path(competition.id))
      .set('Cookie', cookie)
      .send({
        number: '1',
      })
      .expect(400);
  });

  it('Returns a 400 if number is not present in request body', async () => {
    const competition = await global.createCompetition();
    const { cookie } = await global.createUser();

    await request(app)
      .post(path(competition.id))
      .set('Cookie', cookie)
      .send({
        name: faker.name.firstName(),
      })
      .expect(400);
  });

  it('Returns a 400 if number is not an int', async () => {
    const competition = await global.createCompetition();
    const { cookie } = await global.createUser();

    await request(app)
      .post(path(competition.id))
      .set('Cookie', cookie)
      .send({
        name: faker.name.firstName(),
        number: 'abc',
      })
      .expect(400);
  });

  it('Returns a 201 if participant is added to competition', async () => {
    const competition = await global.createCompetition();
    const { cookie } = await global.createUser();

    await request(app)
      .post(path(competition.id))
      .set('Cookie', cookie)
      .send({
        name: faker.name.firstName(),
        number: '1',
      })
      .expect(201);
  });

  it('Participants key in competition document has a length of 1 after adding participant to competition', async () => {
    const competition = await global.createCompetition();
    const { cookie } = await global.createUser();

    await request(app)
      .post(path(competition.id))
      .set('Cookie', cookie)
      .send({
        name: faker.name.firstName(),
        number: '1',
      })
      .expect(201);

    const _competition = await Competition.findById(competition.id);

    expect(_competition.participants.length).toEqual(1);
  });
});
