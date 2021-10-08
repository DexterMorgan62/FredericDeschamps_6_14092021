//importer le package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

//importer mogoose pour ce connecter à la bse de donnée de MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(() => console.log("Connexion à MongoDB échouée"));
module.exports = mongoose;
