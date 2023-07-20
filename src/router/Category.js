const { getData } = require('../controller/CategoryController');
const express = require('express');
const router = express.Router();

router.get('/category', getData);

module.exports = router
