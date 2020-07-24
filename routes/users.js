/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const users = require('../data/users.json');

const filepath = path.join(__dirname, '../data/users.json');

const sendUsers = (req, res) => {
  const reader = fs.createReadStream(filepath, { encoding: 'utf8' });
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  reader.pipe(res);
};

const checkUser = (req, res, next) => {
  if (!users.find((user) => user._id === req.params.id)) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }

  next();
};

const sendUser = (req, res) => {
  res.send(users.find((user) => user._id === req.params.id));
};

router.get('/', sendUsers);
router.get('/:id', checkUser);
router.get('/:id', sendUser);

module.exports = router;
