//importation de mongoose
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
//modéle de base de donnée signup (enregistrer nouvel utilisateur)
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
// vérifie les entrées de base de données en double (email)
userSchema.plugin(uniqueValidator, {
  MessageEvent: "Error, expected {PATH} to be unique.",
});
//exportation du module
module.exports = mongoose.model("user", userSchema);
