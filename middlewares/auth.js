const jwt = require('jsonwebtoken');

const NotAuthorizedError = require('../errors/NotAuthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  let payload;

  try {
    if (!req.cookies._id) {
      throw new NotAuthorizedError('Необходима авторизация');
    }

    const token = req.cookies._id;
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    next(err);
  }

  req.user = payload;

  next();
};
