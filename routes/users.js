/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const filepath = path.join(__dirname, '../data/users.json');

const sendUsers = (req, res) => {
  fs.readFile(filepath, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const sendUser = (req, res) => {
  fs.readFile(filepath, { encoding: 'utf8' })
    .then((data) => JSON.parse(data).find((user) => user._id === req.params.id))
    .then((data) => {
      if (data) {
        res.send(data);
        return;
      }
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

router.get('/', sendUsers);
router.get('/:id', sendUser);

module.exports = router;
