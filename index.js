const express = require("express");
const path = require("path");
require("dotenv").config();
// App de express
const app = express();

// node server for socket
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);

require("./sockets/socket.js");

// mensajes de sockets

// path publico
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// app.listen(process.env.PORT, (err) => { cambio x server
server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log("Servidor corriendo en el puerto", process.env.PORT);
});

// http://localhost:3001/socket.io/socket.io.js