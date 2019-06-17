const httpError = require('http-errors');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authRequire = function (req, res, next) {
  const tk = req.headers.authorization;
  const err = 'Login is required';
  if (!tk) return next(err);
  try {
    req.user = jwt.verify(tk, config.jwtSecret, { ignoreExpiration: true });
    next();
  } catch (error) {
    return next(err);
  }
}

module.exports = authRequire