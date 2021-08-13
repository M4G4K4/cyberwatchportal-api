const express = require('express');

const router = express.Router();

router.use('/auth', require('../controllers/authController'));

// TODO: No  middlware onde se verifica o ex: jwt.verifyToken
//  acrescentar o userid ,fazer -> req.user = decodedUserId;

module.exports = router;
