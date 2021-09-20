const http = require("http");

// importer application app.js
const app = require("./app");

const dotenv = require("dotenv");
const result = dotenv.config();
app.set("port", process.env.PORT);

const server = http.createServer(app);

server.listen(process.env.PORT);
