const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  let payload;

  try {
    if (!req.cookies._id) {
      throw new Error('Необходима авторизация');
    }

    const token = req.cookies._id;
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};
