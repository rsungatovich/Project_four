const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ error: 'Не удалось получить данные' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ error: 'Карточка не создана' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((сard) => {
      res.send({ data: сard });
    })
    .catch(() => res.status(500).send({ error: 'Не удалось удалить данные' }));
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
};
