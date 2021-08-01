// the server modules
import express from "express";
import http from "http";

// web socket module
import { Server } from "socket.io";

// middleware
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import nocache from "nocache";

// my own custom routes
import sockets from "./io";
import routes from "./routes";

// initiate server modules
const app = express();
const server = http.createServer(app);
const io = new Server(server);

/**
 * Middleware
*/
// no cache
app.use(nocache());
// compression
app.use(compression());
// some security headers
app.use(helmet({
    contentSecurityPolicy: false,
}));
// log things
app.use(morgan("combined"));
// parse the body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve public files
const root = `${__dirname}/client/build`;
app.use(express.static(root));

// initiate socket routes
sockets(io);
// initiate normal routes
routes(app, root);

// make the server listen to requests
server.listen(3000, () => {
    console.log("Listening on port", 3000);
});