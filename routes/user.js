const express = require("express");

//importation controllers user.js
const userController = require("../controllers/user");

//fonction router
const router = express.Router();

//importation middleware authentification auth.js
const auth = require("../middleware/auth")

router.post("/signup", userController.signup);
router.post("/login", userController.login);

//exportation du module
module.exports = router;
