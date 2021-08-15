const express = require('express');
const createError = require('http-errors');
const router = express.Router();

router.use('/auth', require('../controllers/authController'));

// TODO: No  middlware onde se verifica o ex: jwt.verifyToken
//  acrescentar o userid ,fazer -> req.user = decodedUserId;

router.use(async (req, res, next) => {
    next(createError.NotFound())
})

router.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

module.exports = router;
