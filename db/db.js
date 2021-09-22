//mongodb+srv://MAM:<password>@cluster0.8hqxe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://MAM:hop2npJ8LzLn@cluster0.8hqxe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => console.log("Connexion à MongoDB réussi"))
    .catch(() => console.log("Connexion à MongoDB échoué"));
module.exports = mongoose;
