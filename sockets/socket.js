const { io } = require("../index");
const Bands = require("../models/bands");
const Band = require("../models/band");
const { Socket } = require("socket.io");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Iron maiden"));
bands.addBand(new Band("Matallica"));
bands.addBand(new Band("Ozzy"));

console.log(bands);

// mensajes de sockets

io.on("connection", (client) => {
    // emitir las bands
    console.log("Cliente conectado");

    client.emit("active-bands", bands.getBands());

    client.on("disconnect", () => {
        console.log("Cliente desconectado");
    });

    client.on("mensaje", (payload) => {
        console.log("Msg!!!!", payload);

        // para mandar msg para todos se instancia a el server
        io.emit("mensaje", { admin: "nuevo mensaje" });
    });

    // test
    client.on("emitir-mensaje", (payload) => {
        console.log(payload);
        // io.emit("nuevo-mensaje", payload); // Emite a todos
        client.broadcast.emit("nuevo-mensaje", payload); // Emite a todos menos al que envio
    });

    // Socket para votos
    client.on("vote-band", (payload) => {
        console.log(payload);
        bands.voteBand(payload.id);
        // mandar a escucar a todos con io el client es a todos menos el q onvia
        io.emit("active-bands", bands.getBands());
    });

    // Socket para agregar band

    client.on("add-band", (payload) => {
        console.log(payload);
        bands.addBand(new Band(payload.name));
        // // mandar a escucar a todos con io el client es a todos menos el q onvia
        io.emit("active-bands", bands.getBands());
    });

    // Socket para eliminar band

    client.on("delete-band", (payload) => {
        console.log(payload);
        bands.deleteBand(payload.id);
        // mandar a escucar a todos con io el client es a todos menos el q onvia
        io.emit("active-bands", bands.getBands());
    });
});