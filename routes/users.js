const router = require('express').Router();
const {
  getUsers,
  findUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', findUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
