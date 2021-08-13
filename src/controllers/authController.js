const router = require('express').Router();
const authService = require('../services/AuthService');

//TODO: middlware used in here should have the req.userId added in the previous middlware

router.get('/cenas', async (req, res, next) => {
    res.send(await authService.heelo(req, res, next));
})

module.exports = router;
