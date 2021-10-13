const express = require("express");

//fonction router
const router = express.Router();

//importation controllers sauce.js
const sauceController = require("../controllers/sauce");

//importation middleware authentification auth.js
const auth = require("../middleware/auth");

const multer = require("../middleware/multer-config");

const { check } = require('express-validator');
router.post(
  "/",
  check("name").escape(),
  check("manufacturer").escape(),
  check("description").escape(),
  check("mainPepper").escape(),
  auth,
  multer,
  sauceController.createSauce
);
router.put(
  "/:id",
  check("name").escape(),
  check("manufacturer").escape(),
  check("description").escape(),
  check("mainPepper").escape(),
  auth,
  sauceController.modifySauce
);
router.delete("/:id", auth, sauceController.deleteSauce);
router.get("/:id", auth, sauceController.getOneSauce);
router.get("/", auth, sauceController.getAllSauce);
router.post('/:id/like', auth, sauceController.opinionSauce);
//exportation du module
module.exports = router;
