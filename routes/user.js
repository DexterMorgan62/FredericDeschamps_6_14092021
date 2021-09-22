const express = require("express");

//importation controllers user.js
const userController = require("../controllers/user");

//fonction router
const router = express.Router();

router.post("/signup", userController.signup);

//exportation du module
module.exports = router;
