const express = require('express');

const router = express.Router();

const {
  getAllUsers,
  getUserById,
  addNewUser,
  updataUser,
  deleteUser
} = require('../controllers/user.controllers');

router.get('/user/getAll', getAllUsers) ;
router.get('/user/getById', getUserById);
router.post('/user/add', addNewUser);
router.patch('/user/updata', updataUser);
router.delete('/user/delete', deleteUser);

module.exports = router;
