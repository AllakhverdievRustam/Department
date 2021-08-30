const express = require('express');

const router = express.Router();

const {
  getAllUsers,
  getOneUser,
  addNewUser,
  editUser,
  deleteUser
} = require('../controllers/user.controllers');

router.get('/getAllUsers', getAllUsers) ;
router.get('/getOneUser', getOneUser);
router.post('/addNewUser', addNewUser);
router.patch('/editUser', editUser);
router.delete('/deleteUser', deleteUser);

module.exports = router;