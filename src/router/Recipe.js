const {
  getData,
  getDataDetail,
  getDataById,
  postData,
  putData,
  deleteData,
  getUsersRecipe,
  
} = require('../controller/RecipeControler');
const Protect = require('../middleware/Protect')
const upload = require('../middleware/Upload')
const express = require('express');

const router = express.Router();

//recipe
router.get('/recipe', Protect, getData);
router.get('/recipe/detail', getDataDetail);
router.get('/recipe/:id', getDataById);
router.get('/data/:users_id',getUsersRecipe)
router.post('/recipe', Protect,upload.single('photo'), postData);
router.put('/recipe/:id', Protect,upload.single('photo'), putData);
router.delete('/recipe/:id', Protect, deleteData);

//user

module.exports = router;
console.log('ini router');
