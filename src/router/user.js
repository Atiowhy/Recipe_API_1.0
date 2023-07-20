const {
  getUserData,
  getUserId,
  postDataUser,
  deleteDataUser,
  updateUser,
} = require('../controller/userController');
const express = require('express');

const router = express.Router();

//user
router.get('/user', getUserData);
router.get('/user/:id', getUserId);
router.post('/user', postDataUser);
router.delete('/user/:id', deleteDataUser);
router.put('/user/:id', updateUser);
// router.get('/user/:id', getDataById)
// router.post('/user',register)
// router.put('/user/:id', updateUser)
// router.delete('/user/:id',deleteUser)

module.exports = router;
