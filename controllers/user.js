//importation model user.js
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//fonction signup enregistrer nouveau utilisateur
exports.signup = (req, res) => {
  console.log(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//fonction login connexion utilisateur
exports.login = (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé ! " });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Mot de passe incorrect ! " });
          }
          //Le mot de passe est correct
          //envoie dans la response du serveur du userId et du token d'authentification
          res.status(200).json({
            userId: user._id,
            //encodage du userId pour la création d'un nouvel objet (objet et userId liés)
            token: jwt.sign(
              { userId: user._id },
              `${process.env.JWT_KEY_TOKEN}`,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
