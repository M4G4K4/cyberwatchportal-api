const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/JWTHelper');
const { verifyRequests, requestLimiter } = require('../middleware/requestValidation');

router.use('/auth', requestLimiter, require('../controllers/authController'));
router.use('/user', verifyToken, require('../controllers/userController'));
router.use('/website', verifyToken, verifyRequests, require('../controllers/websiteController'));

module.exports = router;
