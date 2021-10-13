//importation de mongoose
const mongoose = require("mongoose");

//modéle de base de donnée signup (enregistrer nouvel sauce)
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  mainPepper: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: String, required: false },
  usersDisliked: { type: String, required: false },
});

//exportation du module
module.exports = mongoose.model("sauce", sauceSchema);
