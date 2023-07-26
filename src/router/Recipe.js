const {
  getData,
  getDataDetail,
  getDataById,
  postData,
  putData,
  deleteData,
  getUsersRecipe
} = require('../controller/RecipeControler');
const Protect = require('../middleware/Protect')

const express = require('express');

const router = express.Router();

//recipe
router.get('/recipe', Protect, getData);
router.get('/recipe/detail', getDataDetail);
router.get('/recipe/:id', getDataById);
router.get('/data/:users_id',getUsersRecipe)
router.post('/recipe', Protect, postData);
router.put('/recipe/:id', Protect, putData);
router.delete('/recipe/:id', Protect, deleteData);

//user

module.exports = router;
console.log('ini router');
