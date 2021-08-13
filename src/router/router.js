const express = require('express');
const router = express.Router();
const { verifyToken } = require('../helpers/jwt/jwt_helper');

router.use('/auth', require('../controllers/authController'));

// TODO: No  middlware onde se verifica o ex: jwt.verifyToken acrescentar o userid ,fazer -> req.user = decodedUserId;

module.exports = router;
