const Card = require('../models/card');
const checkError = require('../helpers/checkError');

const getCards = (req, res) => {
  Card.find({})
    .populate(['likes'])
    .then((cards) => {
      if (cards.length) {
        return res.send({ data: cards });
      }
      return Promise.reject(new Error('Ничего не найдено'));
    })
    .catch((err) => {
      checkError(err, res);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      checkError(err, res);
    });
};

const deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        return Promise.reject(new Error('Ничего не найдено'));
      }
      if (card.owner.toString() !== req.user._id) {
        return Promise.reject(new Error('Нет доступа к действию'));
      }
      card.remove();
      return res.send({ data: card });
    })
    .catch((err) => {
      checkError(err, res);
    });
};

const addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      return Promise.reject(new Error('Ничего не найдено'));
    })
    .catch((err) => {
      checkError(err, res);
    });
};

const deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      return Promise.reject(new Error('Ничего не найдено'));
    })
    .catch((err) => {
      checkError(err, res);
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  addLikeCard,
  deleteLikeCard,
};
