const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length) {
        res.send({ data: users });
        return;
      }
      res.status(404).send({ message: 'Пользователи не найдены' });
    })
    .catch((err) => res.status(500).send(err.message));
};

const findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
        return;
      }
      res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => res.status(500).send(err.message));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(err.message));
};

module.exports = {
  getUsers,
  findUser,
  createUser,
};
