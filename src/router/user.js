const {
  getUserData,
  getUserId,
  postDataUser,
  deleteDataUser,
  updateUser,
  login,
  
} = require('../controller/userController');
const express = require('express');
const Upload = require('../middleware/Upload');
const upload = require('../middleware/Upload');
const router = express.Router();

//user
// router.post('/login',login)
router.get('/user', getUserData);
router.get('/user/:id', getUserId);
// router.post('/regis', postDataUser);
router.delete('/user/:id', deleteDataUser);
router.put('/user/:id', updateUser);
// router.get('/user/:id', getDataById)
// router.post('/user',register)
// router.put('/user/:id', updateUser)
// router.delete('/user/:id',deleteUser)

module.exports = router;
