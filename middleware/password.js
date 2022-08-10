// importaion password-validator
const { mongoose } = require("mongoose");
const PasswordValidator = require("password-validator");
const { schema } = require("../models/user");

// création du schéma
const passwordSchema = new PasswordValidator();

// le shéma doit respecter le mot de passe
passwordSchema
  .is()
  .min(5) // Minimum length 5
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

// vérification qualité du password
module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      message:
        "The password is not strong enough: " +
        passwordSchema.validate("req.body.password", { list: true }),
    });
  }
};
