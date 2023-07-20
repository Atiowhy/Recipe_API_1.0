const {
  getData,
  getDataDetail,
  getDataById,
  postData,
  putData,
  deleteData,
} = require('../controller/RecipeControler');

const express = require('express');

const router = express.Router();

//recipe
router.get('/recipe', getData);
router.get('/recipe/detail',getDataDetail)
router.get('/recipe/:id', getDataById);
router.post('/recipe', postData);
router.put('/recipe/:id', putData);
router.delete('/recipe/:id', deleteData);

//user

module.exports = router;
console.log('ini router');
