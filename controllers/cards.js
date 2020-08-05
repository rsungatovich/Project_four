const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send(err.message));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send(err.message));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((сard) => {
      res.send({ data: сard });
    })
    .catch((err) => res.status(500).send(err.message));
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
};
