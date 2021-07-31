import { FC, useState, useEffect } from "react";

import {
    createStyles, Divider, makeStyles, Paper, TextField, Typography
} from "@material-ui/core";
import useEventListener from "@use-it/event-listener";
import { Socket } from "socket.io-client";


interface ChatProps {
    socket: Socket
};

const useStyles = makeStyles(theme => createStyles({
    root: {
        width: "100%",
        height: "100%",

        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
    },
    paper: {
        width: "100%",
        height: "80vh",
    },
    chat: {
        width: "100%",
        height: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",

        "& > div": {
            marginTop: 10,
        },
    },
}));

interface Messages {
    name: string;
    message: string;
};

const Chat: FC<ChatProps> = ({ socket }) => {
    const classes = useStyles();

    // current input
    const [input, setInput] = useState("");

    // current messages
    const [messages, setMessages] = useState<Messages[]>([]);

    useEffect(() => {
        socket.on("message", (res: Messages) => {
            setMessages(prev => {
                return [...prev, res];
            });
        });
    }, []);

    useEventListener("keyup", (event: any) => {
        if (event.keyCode === 13) {
            console.log("Enter pressed");

            event.preventDefault();
            socket.emit("message", { name: "Tronikel", message: input });
        };
    });

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <div className={classes.chat}>
                    {messages.map(value => {
                        return (
                            <Paper
                                elevation={12}
                                style={{ margin: 5 }}
                            >
                                <div style={{ margin: 5 }}>
                                    <Typography variant="button">
                                        {value.name}:
                                    </Typography>

                                    <Divider />

                                    <Typography variant="subtitle1">
                                        {value.message}
                                    </Typography>
                                </div>
                            </Paper>
                        )
                    })}
                </div>
            </Paper>

            <div style={{ height: 15 }} />

            <TextField
                variant="outlined"
                label="Message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </div>
    );
};
export default Chat;