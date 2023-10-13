const app = require('express');
const router = app.Router();
const Recipe = require('./Recipe');
const User = require('./user');
const Category = require('./Category');
const auth = require("../router/Auth")

router.use('/', Recipe);
router.use('/', User);
router.use('/', Category);
router.use('/auth', auth);

module.exports = router;
