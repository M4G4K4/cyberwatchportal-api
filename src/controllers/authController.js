const router = require('express').Router();
const authService = require('../services/authService');

// TODO: middlware used in here should have the req.userId added in the previous middlware

router.get('/cenas', async (req, res, next) => {
  res.send(await authService.hello(req, res, next));
});

router.get('/coisas', async (req, res) => {
  res.send(await authService.nice());
});

router.get('/test', async (req, res) => {
  const data = {
    user: 'pedro',
    email: 'pedro@gmail.com',
  };
  res.send(data);
});

module.exports = router;
