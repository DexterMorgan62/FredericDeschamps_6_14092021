//importation de mongoose
const mongoose = require("mongoose");

//modéle de base de donnée signup (enregistrer nouvel utilisateur)
const userSchema = mongoose.Schema({
email: { type: String, required: true, unique: true},
password: {type: String, required: true},
});

//exportation du module
module.exports = mongoose.model("user", userSchema);