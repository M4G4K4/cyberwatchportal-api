const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
  signToken: (userId) => new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN;
    const options = {
      expiresIn: '1y',
      issuer: 'https://github.com/m4g4k4', // change to domain
      audience: userId.toString(),
    };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError);
      }
      resolve(token);
    });
  }),

  verifyToken: (req, res, next) => {
    if (!req.headers.authorization) {
      return next(createError.Unauthorized('No authorization token provided'));
    }

    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, payload) => {
      if (err) {
        return next(createError.Unauthorized('Error validating token'));
      }
      req.payload = payload;
      next();
    });
  },

  signRefreshToken: (userId) => new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.REFRESH_TOKEN;
    const options = {
      expiresIn: '1y',
      issuer: 'https://github.com/m4g4k4', // change to domain
      audience: userId.toString(),
    };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError);
      }
      resolve(token);
    });
  }),

  verifyRefreshToken: (refreshToken) => new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, payload) => {
      if (err) {
        return reject(createError.Forbidden('Refresh token is invalid'));
      }
      const userId = payload.aud;

      resolve(userId);
    });
  }),
};
