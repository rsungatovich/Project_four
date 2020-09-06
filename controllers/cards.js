const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const NoAccessError = require('../errors/NoAccessError');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail(new NotFoundError('Ничего не найдено'))
    .populate(['likes'])
    .then((cards) => {
      res.send({ data: cards });
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
    .orFail(new NotFoundError('Ничего не найдено'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new NoAccessError('Нет доступа к действию');
      }
      card.remove((err, crd) => {
        if (err) throw new Error('На сервере произошла ошибка');
        res.send({ data: crd });
      });
    })
    .catch(next);
};

const addLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Ничего не найдено'))
    .populate('likes')
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

const deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Ничего не найдено'))
    .populate('likes')
    .then((card) => {
      res.send({ data: card });
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
