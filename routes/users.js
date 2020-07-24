/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const filepath = path.join(__dirname, '../data/users.json');

const sendUsers = (req, res) => {
  fs.readFile(filepath, { encoding: 'utf8' })
    .then((data) => {
      const usersData = JSON.parse(data);
      res.send(usersData);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const checkUser = (req, res, next) => {
  fs.readFile(filepath, { encoding: 'utf8' })
    .then((data) => {
      const usersData = JSON.parse(data);
      if (!usersData.find((user) => user._id === req.params.id)) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      next();
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const sendUser = (req, res) => {
  fs.readFile(filepath, { encoding: 'utf8' })
    .then((data) => {
      const usersData = JSON.parse(data);
      res.send(usersData.find((user) => user._id === req.params.id));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

router.get('/', sendUsers);
router.get('/:id', checkUser);
router.get('/:id', sendUser);

module.exports = router;
