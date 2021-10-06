//importation de mongoose
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
//modéle de base de donnée signup (enregistrer nouvel utilisateur)
const userSchema = mongoose.Schema({
email: { type: String, required: true, unique: true},
password: {type: String, required: true},
});
userSchema.plugin(uniqueValidator);
//exportation du module
module.exports = mongoose.model("user", userSchema);