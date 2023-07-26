const app = require('express');
const router = app.Router();
const Recipe = require('./Recipe');
const User = require('./user');
const Category = require('./Category');

router.use('/', Recipe);
router.use('/', User);
router.use('/', Category);
module.exports = router;
