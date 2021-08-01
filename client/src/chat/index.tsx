import { FC, useState, useEffect, useRef } from "react";

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
        height: "80vh",

        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
    },
    paper: {
        width: "100%",
        height: "100%",
    },
    chat: {
        width: "100%",
        height: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        
        overflow: "auto",
    },
    text: {
        wordBreak: "break-all",
        padding: 10,
        margin: 10,
        whiteSpace: "pre-line",
    },
}));

interface Messages {
    name: string;
    message: string;
};

// no spam logic
let canSend = false;
setInterval(() => {
    canSend = true;
}, 1000);

const Chat: FC<ChatProps> = ({ socket }) => {
    const classes = useStyles();

    // current input
    const [input, setInput] = useState("");
    // current messages
    const [messages, setMessages] = useState<Messages[]>([]);

    // ref for scrolling to bottom
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socket.on("message", (res: Messages) => {
            setMessages(prev => {
                return [...prev, res];
            });
        });
    }, []);

    // make dic scroll to bottom after messages appear
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // send message on Enter press
    useEventListener("keydown", (event: any) => {
        console.log(event);
        
        // don't emit if shift key is being pressed or cant send
        if (event.shiftKey || !canSend) return;

        if (event.keyCode === 13) {
            console.log("Enter pressed");
            // check if not empty
            if (!input.trim()) return;
            // max length is 800
            if (input.trim().length > 800) return;

            // emit to all
            event.preventDefault();
            socket.emit(
                "message", {
                    name: "Tronikel", message: input.replace(/[\r\n]+/g, "\n").trim(),
                },
            );

            // set input to none
            setInput("");
            // cant send for 1.5 seconds
            canSend = false;
        };
    });

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <div className={classes.chat}>
                    <div>
                        {messages.map(value => {
                            return (<>
                                <Paper elevation={15} className={classes.text}>
                                    <Typography variant="button">
                                        {value.name}:
                                    </Typography>

                                    <Divider />

                                    <Typography variant="subtitle1">
                                        {value.message}
                                    </Typography>
                                </Paper>
                            </>)
                        })}
                        {/** scroll to this div */}
                        <div ref={ref} />
                    </div>

                </div>
            </Paper>

            <div style={{ height: 15 }} />

            <TextField
                variant="outlined"
                label="Message"
                value={input}

                maxRows={5}
                multiline

                onChange={(e) => setInput(e.target.value)}
            />
        </div>
    );
};
export default Chat;