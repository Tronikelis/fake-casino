import { Server, Socket } from "socket.io";

interface Wheel {
    spin: boolean;
    prize: number;
};

export default function (io: Server) {

    io.on("connection", async (socket) => {
        console.log("User connected!");
        // chat portion
        Chat(socket, io);
        
        // TODO right user side where misc info is
        // const clients = (await io.sockets.allSockets()).size;
        // io.emit("users", clients);
    });

    // wheel portion
    Wheel(io);
};

function Wheel(io: Server) {
    // interval for handling the wheel
    let timer = 0;
    setInterval(() => {
        timer++;

        // if the timer is 20 then spin the wheel
        if (timer >= 25) {
            const info: Wheel = {
                prize: Math.round(Math.random() * 14),
                spin: true,
            };
            console.log({ info });
            io.emit("wheel", info);

            timer = 0;
        };

        // send current time
        io.emit("time", { timer: timer });
    }, 1000);

    io.on("connection", socket => {
        // send current time
        io.to(socket.id).emit("time", { timer: timer });
    });
};

function Chat(socket: Socket, io: Server) {
    socket.on("message", message => {
        console.log({ message });
        io.emit("message", message);
    });
};
