const request = require('supertest');
const app = require('../../app');

describe('GET /auth', () => {
  it('responds with json', async () => {
    const userRegister = {
      first_name: "sdfsdf",
      last_name: "hgdjrsdg",
      username: "dfghaedf",
      email: "sfghngsfg@gmail.com",
      password: "password"
    }
    const res = await request(app).post('/auth/register').send(userRegister);

    expect(res.statusCode).toEqual(200);
  });
});
