const http = require("http");

// importer application app.js
const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
