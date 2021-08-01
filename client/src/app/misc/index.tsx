import { FC, useEffect, useContext, useState } from "react";

import { createStyles, makeStyles, Paper, Typography } from "@material-ui/core";
import { Socket } from "socket.io-client";

// misc context
import Context from "../context";

const useStyles = makeStyles(theme => createStyles({
    root: {
        width: "100%",
        height: "100%",

        display: "grid",
        placeItems: "center",
    },
    paper: {
        width: "80%",
        height: "100%",
        padding: 20,

        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
    },
    content: {
        width: "100%",
        height: "100%",

        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
    },
}));

// money formatter
const { format } = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

interface MiscProps {
    socket: Socket
};


const Misc: FC<MiscProps> = ({ socket }) => {
    const classes = useStyles();

    // money (context) state
    const { context } = useContext(Context);
    // destructor
    const { money, previous } = context;
    
    // active users state
    const [active, setActive] = useState(0);

    useEffect(() => {
        // active users
        socket.on("active", (res: { users: number }) => {
            setActive(res.users);
        });

        // on wheel spin
    }, []);

    useEffect(() => {

    })

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div>
                    <Typography variant="button">
                        Money: {format(Number(money))}
                    </Typography>

                    <Typography variant="subtitle1">
                        Users: {active}
                    </Typography>
                </div>

                <div>
                    <Typography>
                        Last: {previous}
                    </Typography>
                </div>
            </Paper>
        </div>
    );
};
export default Misc;