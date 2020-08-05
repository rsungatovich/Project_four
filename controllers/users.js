const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ error: 'Не удалось получить данные' }));
};

const findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => res.status(404).send({ error: 'Пользователь не найден' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ error: 'Пользователь не создан' }));
};

module.exports = {
  getUsers,
  findUser,
  createUser,
};
