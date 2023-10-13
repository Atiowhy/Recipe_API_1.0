const {
  getData,
  getDataDetail,
  getDataById,
  postData,
  putData,
  deleteData,
  getUsersRecipe,
  getSearchData
} = require('../controller/RecipeControler');
const Protect = require('../middleware/Protect')
const upload = require('../middleware/Upload')
const express = require('express');

const router = express.Router();

//recipe
router.get('/search', Protect, getSearchData)

router.get('/recipe', Protect, getData);
router.get('/recipe/detail', getDataDetail);
router.get('/recipe/:id', getDataById);
router.get('/data',getUsersRecipe, Protect)
router.post('/recipe', Protect,upload.single('image'), postData);
router.put('/recipe/:id', Protect,upload.single('image'), putData);
router.delete('/recipe/:id', Protect, deleteData);

//user

module.exports = router;
console.log('ini router');
