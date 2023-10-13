const { login, register } = require("../controller/AuthController");
const upload = require("../middleware/Upload")
const express = require("express");
const router = express.Router();

router.post("/login", login);
router.post("/register", register, upload.single('photo'));

module.exports = router;