const { io } = require("../index");

// mensajes de sockets

io.on("connection", (client) => {
    console.log("Cliente conectado");

    client.on("disconnect", () => {
        console.log("Cliente desconectado");
    });

    client.on("mensaje", (payload) => {
        console.log("Msg!!!!", payload);

        // para mandar msg para todos se instancia a el server
        io.emit("mensaje", { admin: "nuevo mensaje" });
    });
});