const express = require("express");

//fonction router
const router = express.Router();

//importation controllers sauce.js
const sauceController = require("../controllers/sauce");

//importation middleware authentification auth.js
const auth = require("../middleware/auth");

const multer = require("../middleware/multer-config");

router.post("/", auth, multer, sauceController.createSauce);
router.put("/:id", auth, multer, sauceController.modifySauce);
router.delete("/:id", auth, sauceController.deleteSauce);
router.get("/:id", auth, sauceController.getOneSauce);
router.get("/", auth, sauceController.getAllSauce);
router.post("/:id/like", auth, sauceController.opinionSauce);
//exportation du module
module.exports = router;
