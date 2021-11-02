/**
 * Importer le package File System pour la modification du système de fichiers (suppression des images)
 */
const fs = require("fs");

//importation model sauce.js
const Sauce = require("../models/sauce");

//fonction addSauce enregistrer nouvelle sauce
exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then((sauce) => res.status(201).json({ message: "Sauce ajoutée" }))
    .catch((error) => res.status(400).json({ message: error }));
  console.log(sauceObject._id);
  console.log(sauceObject);
};

exports.modifySauce = (req, res) => {
  // Récupérer les données de la requête
  const sauceObject = req.file // Opérateur ternaire pour vérifier image (req.file)
    ? {
        // Si image existe
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }; // Si image n'existe pas
  console.log(req.file);

  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split("/images/")[1]; // Nom de l'image dans le dossier /images/
    console.log(filename);
    fs.unlink(`images/${filename}`, () => {
      // Supprimer l'image
      // Mettre à jour la Sauce
      console.log(req.body);
      Sauce.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Sauce modifiée" }))
        .catch((error) => res.status(400).json({ error }));
    });
  });
};

exports.deleteSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        // Supprimer la Sauce
        Sauce.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: "La sauce a bien été supprimée !" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getOneSauce = (req, res) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};
exports.getAllSauce = (req, res) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
/**
 * Liker, Disliker ou supprimer son opinion
 */
exports.opinionSauce = (req, res) => {
  switch (req.body.like) {
    case 0: // Si l'utilisateur supprime son opinion
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          // Si l'utilisateur avait liké la Sauce
          if (sauce.usersLiked.find((user) => user === req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 }, // Décrémenter de 1 les likes
                $pull: { usersLiked: req.body.userId }, // Retirer l'ID de l'utilisateur du tableau des liked
                _id: req.params.id,
              }
            )
              .then(() =>
                res
                  .status(201)
                  .json({ message: "Ton avis a été pris en compte!" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          // Si l'utilisateur avait disliké la Sauce
          if (sauce.usersDisliked.find((user) => user === req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 }, // Décrémenter de 1 les dislikes
                $pull: { usersDisliked: req.body.userId }, // Retirer l'ID de l'utilisateur du tableau des disliked
                _id: req.params.id,
              }
            )
              .then(() =>
                res
                  .status(201)
                  .json({ message: "Ton avis a été pris en compte!" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(404).json({ error }));
      break;
    case 1: // Si l'utilisateur like la Sauce
      Sauce.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: 1 }, // Incrémenter de 1 les likes
          $push: { usersLiked: req.body.userId }, // Ajouter l'ID de l'utilisateur au tableau des liked
          _id: req.params.id,
        }
      )
        .then(() =>
          res.status(201).json({ message: "Ton like a été pris en compte !" })
        )
        .catch((error) => res.status(400).json({ error }));
      break;
    case -1: // Si l'utilisateur dislike la Sauce
      Sauce.updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: 1 }, // Incrémenter de 1 les disliked
          $push: { usersDisliked: req.body.userId }, // Ajouter l'ID de l'utilisateur au tableau des disliked
          _id: req.params.id,
        }
      )
        .then(() =>
          res
            .status(201)
            .json({ message: "Ton dislike a été pris en compte !" })
        )
        .catch((error) => res.status(400).json({ error }));
      break;
    default:
      // Si la valeur attendu n'est pas correcte
      console.error("Cette valeur n'est pas valide !");
  }
};
