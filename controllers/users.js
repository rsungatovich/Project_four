const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const checkError = require('../helpers/checkError');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length) {
        return res.send({ data: users });
      }
      return Promise.reject(new Error('Ничего не найдено'));
    })
    .catch((err) => {
      checkError(err, res);
    });
};

const findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return Promise.reject(new Error('Ничего не найдено'));
    })
    .catch((err) => {
      checkError(err, res);
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!password || password.length < 5 || !password.trim()) {
    res.status(400).send({ message: 'Запрос неверно сформирован' });
    return;
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      checkError(err, res);
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return Promise.reject(new Error('Ничего не найдено'));
    })
    .catch((err) => {
      checkError(err, res);
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return Promise.reject(new Error('Ничего не найдено'));
    })
    .catch((err) => {
      checkError(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.userAuthentication(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('_id', token, { httpOnly: true });
      res.end('Токен отправлен');
    })
    .catch((err) => {
      checkError(err, res);
    });
};

module.exports = {
  login,
  getUsers,
  findUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
