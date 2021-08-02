import { Dispatch, FC, SetStateAction, useState } from "react";

import {
    makeStyles, createStyles, Paper, TextField, Button
} from "@material-ui/core";

import { Socket } from "socket.io-client";

// icons
import CheckIcon from '@material-ui/icons/Check';


export interface BettingProps {
    socket: Socket;
    state: {
        bets: Bets;
        setBets: Dispatch<SetStateAction<Bets>>
    }
};

interface Bets {
    red: number;
    black: number;
    green: number;
};

const useStyles = makeStyles(theme => createStyles({
    root: {
        width: "100%",
        height: "80vh",

        display: "flex",
    },
    paper: {
        width: "100%",
        height: "100%",
        padding: 5,
    },
    bottom: {
        width: "100%",
        height: "100%",

        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        flexDirection: "row",
    },
    top: {
        width: "100%",
        height: "auto",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));


const Betting: FC<BettingProps> = ({ socket, state }) => {
    const classes = useStyles();

    const { bets, setBets } = state;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>

                {/** top part */}
                <div className={classes.top}>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        endIcon={<CheckIcon />}
                    >
                        Bet
                    </Button>
                </div>

                <div style={{ height: 10 }} />

                {/** bottom part */}
                <div className={classes.bottom}>
                    
                    {/** black */}
                    <div>
                        <TextField
                            type="number"
                            color="secondary"

                            helperText={`Current: ${bets.black}`}
                            label="Black ⚫"
                        />
                    </div>

                    {/** green */}
                    <div>
                        <TextField
                            type="number"
                            color="secondary"
                            
                            helperText={`Current: ${bets.green}`}
                            label="Green 🟢"
                        />
                    </div>

                    {/** red */}
                    <div>
                        <TextField
                            type="number"
                            label="Red 🔴"
                            color="secondary"

                            helperText={`Current: ${bets.red}`}
                        />
                    </div>
                </div>

            </Paper>
        </div>
    );
};
export default Betting;