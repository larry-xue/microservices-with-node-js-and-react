import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'asdasd',
      password: 'paaaaaaaaa',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'as@dasd.c',
      password: 'p',
    })
    .expect(400);
});

it('returns a 400 with missging email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'asd@SAd.com',
    })
    .expect(400);
  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'asd@SAd.com',
    })
    .expect(400);
});

it('disallow duplicate email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'azoux@test.com',
      password: 'asdadasdas',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'azoux@test.com',
      password: 'asdadasdas',
    })
    .expect(400);
});

it('set a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'aasds@dasd.casd',
      password: 'paaaaaaaaaaaaaaa',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
