const request = require('supertest');
const app = require('../../app');

describe('POST /auth', () => {
  it('Register user', async () => {
    const userRegister = {
      first_name: "sdfsdf",
      last_name: "hgdjrsdg",
      username: "dfghaedf",
      email: "sfghngsfg@gmail.com",
      password: "password"
    }
    const res = await request(app).post('/auth/register').send(userRegister);

    expect(res.statusCode).toEqual(201);
  });

  it('Login User ', async () => {
    const userLogin = {
      email: "pedrovsdias@gmail.com",
      password: "password"
    }
    const res = await request(app).post('/auth/login').send(userLogin);

    expect(res.statusCode).toEqual(200);
  });
});
