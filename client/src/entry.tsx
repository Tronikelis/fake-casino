import { FC } from "react";

import {
    createStyles, CssBaseline, Grid, makeStyles
} from "@material-ui/core";
import io from "socket.io-client";

// my custom components
import Roulette from "./roulette";
import Chat from "./chat";

// initialize socket.io (web-sockets) awesome thing
const socket = io();

const useStyles = makeStyles(theme => createStyles({
    root: {
        width: "100%",
        height: "100%",
        flexGrow: 1,

        display: "grid",
        placeItems: "center"
    },
    grid: {
        width: "100%",
        height: "100%",
    },
}));

const Entry: FC = () => {
    const classes = useStyles();

    return (<>
        <CssBaseline>
            <div className={classes.root}>
                {/** container for everything */}
                <Grid
                    className={classes.grid}
                    container
                    spacing={6}
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    {/** chat portion */}
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <Chat socket={socket} />
                    </Grid>

                    {/** roulette portion */}
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Roulette socket={socket} />
                    </Grid>
                </Grid>

            </div>
        </CssBaseline>
    </>);
};
export default Entry;