const router = require('express').Router();

router.get('/me', async (req, res, next) => {
    res.send('User')
});


module.exports = router;
