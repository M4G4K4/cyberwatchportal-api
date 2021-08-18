const express = require('express');
const router = express.Router();

const { verifyToken } = require('../helpers/jwt/jwt_helper');


router.use('/auth', require('../controllers/authController'));
router.use('/user', verifyToken, require('../controllers/userController'));

module.exports = router;
