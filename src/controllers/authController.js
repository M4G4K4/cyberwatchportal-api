const router = require('express').Router();
const authService = require('../services/authService');

// TODO: middlware used in here should have the req.userId added in the previous middlware

router.post('/register', async (req, res, next) => {
  res.send(await authService.register(req, res, next));
});

module.exports = router;
