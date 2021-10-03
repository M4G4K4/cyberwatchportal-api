const express = require('express');
const router = express.Router();

const { verifyToken } = require('../helpers/jwt_helper');
const { verifyRequests, requestLimiter } = require('../middlewares/requestValidation');


router.use('/auth', requestLimiter , require('../controllers/authController'));
router.use('/user', verifyToken, verifyRequests, require('../controllers/userController'));
router.use('/website', require('../controllers/websiteController'));

module.exports = router;
