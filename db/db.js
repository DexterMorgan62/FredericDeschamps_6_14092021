//importer le package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

//importer mogoose pour ce connecter à la base de donnée de MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("Successful connection to MongoDB"))
  .catch(() => console.log("Connection to MongoDB failed"));
module.exports = mongoose;
