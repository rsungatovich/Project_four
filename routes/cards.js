const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const filepath = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
  fs.readFile(filepath, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

module.exports = router;
