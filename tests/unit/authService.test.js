const authservice = require('../../src/services/authService');

test('return Pedro', async () => {
  expect(await authservice.nice()).toBe('Pedro');
});
