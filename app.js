const express = require("express");

const morgan = require("morgan");

// connexion base de données MongoDB
const mongoose = require("./db/db");

// importation routes
const userRoutes = require("./routes/user");
const { Mongoose } = require("mongoose");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// log requetes responses
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", userRoutes);

module.exports = app;
