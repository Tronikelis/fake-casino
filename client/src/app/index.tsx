import { FC } from "react";

import { makeStyles, createStyles, Grid } from "@material-ui/core";
import { Socket } from "socket.io-client";

// my custom components
import Roulette from "./roulette";
import Chat from "./chat";

interface AppProps {
    socket: Socket
};

const useStyles = makeStyles(theme => createStyles({
    root: {
        width: "100%",
        height: "100%",

        display: "grid",
        placeItems: "center"
    },
    grid: {
        width: "100%",
        height: "100%",
    },
}));

const App: FC<AppProps> = ({ socket }) => {
    const classes = useStyles();

    return (<>
       {/** enter the casino! */}
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
    </>);
};
export default App;