const express = require('express');
const createError = require('http-errors');
const router = express.Router();

router.use('/auth', require('../controllers/authController'));

module.exports = router;
