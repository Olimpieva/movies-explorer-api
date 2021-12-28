const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-error');
const { errorMessages } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    let payload;
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
    } catch (error) {
      throw new UnauthorizedError(errorMessages.invalidAuthUserData);
    }
    req.user = payload;
    next();
  } else {
    next(new UnauthorizedError(errorMessages.needAuth));
  }
  return null;
};
