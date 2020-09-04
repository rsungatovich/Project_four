const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const NoAccessError = require('../errors/NoAccessError');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['likes'])
    .then((cards) => {
      if (!cards.length) {
        throw new NotFoundError('Ничего не найдено');
      }
      return res.send({ data: cards });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Ничего не найдено');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new NoAccessError('Нет доступа к действию');
      }
      card.remove();
      return res.send({ data: card });
    })
    .catch(next);
};

const addLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Ничего не найдено');
      }
      return res.send({ data: card });
    })
    .catch(next);
};

const deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Ничего не найдено');
      }
      return res.send({ data: card });
    })
    .catch(next);
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  addLikeCard,
  deleteLikeCard,
};
