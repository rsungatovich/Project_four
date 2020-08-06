const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards.length) {
        res.send({ data: cards });
        return;
      }
      res.status(404).send({ message: 'Карточки не найдены' });
    })
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
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }
      res.status(404).send({ message: 'Нет такой карточки' });
    })
    .catch((err) => res.status(500).send(err.message));
};

const addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }
      res.status(404).send({ message: 'Карточки больше нет' });
    })
    .catch((err) => res.status(500).send(err.message));
};

const deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }
      res.status(404).send({ message: 'Карточки больше нет' });
    })
    .catch((err) => res.status(500).send(err.message));
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  addLikeCard,
  deleteLikeCard,
};
