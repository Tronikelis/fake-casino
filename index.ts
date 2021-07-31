import express from "express";
import http from "http";

import { Server } from "socket.io";

import sockets from "./io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const root = `${__dirname}/client/build`;

app.use(express.static(root));

app.get("/", (req, res) => {
    return res.sendFile(root + "/index.html");
});

// initiate socket routes
sockets(io);

server.listen(3000, () => {
    console.log("Listening on port", 3000);
});