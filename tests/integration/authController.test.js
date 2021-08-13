const request = require('supertest');
const app = require('../../app');


describe('GET /auth', () => {
    it('responds with json', async () => {
        const res = await request(app).get('/auth/test');

        expect(res.statusCode).toEqual(200);
    });
});
