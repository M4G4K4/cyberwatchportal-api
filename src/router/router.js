const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/JWTHelper');
const { requestLimiter } = require('../middleware/requestValidation');

router.use('/auth', requestLimiter, require('../controllers/authController'));
router.use('/user', verifyToken, require('../controllers/userController'));
router.use('/website', require('../controllers/websiteController'));

module.exports = router;
