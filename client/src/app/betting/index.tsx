import { Dispatch, FC, SetStateAction, useState, useEffect, useContext } from "react";

import {
    makeStyles, createStyles, Paper, TextField, Button, Divider, Typography
} from "@material-ui/core";

import { Socket } from "socket.io-client";

// icons
import CheckIcon from '@material-ui/icons/Check';

// money context
import Context from "../context";

export interface BettingProps {
    socket: Socket;
    state: {
        bets: Bets;
        setBets: Dispatch<SetStateAction<Bets>>

        spinning: boolean;
        prize: number;
    }
};

interface Bets {
    red: number;
    black: number;
    green: number;
};

interface Others {
    username: string;
    bets: Bets;
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
    inner: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
    },
}));


const Betting: FC<BettingProps> = ({ socket, state }) => {
    const classes = useStyles();

    const { bets, setBets, spinning, prize } = state;

    // state for the button
    const [disabled, setDisabled] = useState(false);

    // state for all the others' bets
    const [others, setOthers] = useState<Others[]>([]);

    // websocket listeners
    useEffect(() => {
        // get bets from others
        socket.on("others", (res: { username: string; bets: Bets }) => {

            console.log({ res });
            setOthers(prev => {
                return [...prev, res];
            });
        });

    }, []);

    // context for money adjustment
    const { setContext, context } = useContext(Context);

    // when spinning is false set disabled to false
    useEffect(() => {
        // when the wheel stops reset everything
        if (!spinning) {
            const { black, green, red } = bets;
            // give money if bets aren't 0
            if (black || green || red) {
                // adjust the money based on prize
                if (prize === 0 && green) {
                    setContext(prev => {
                        prev.money = prev.money + (green * 14);
                        return { ...prev };
                    });

                } else {
                    const color = prize % 2 === 0 ? "red" : "black";

                    if (color === "black" && black) {
                        setContext(prev => {
                            prev.money = prev.money + (black * 2);
                            return { ...prev };
                        });

                    } else if (color === "red" && red) {
                        setContext(prev => {
                            prev.money = prev.money + (red * 2);
                            return { ...prev };
                        });
                    };
                };

            };
            // reset everything
            setDisabled(false);
            setOthers([]);
            // set bets to zero
            setBets({
                black: 0,
                green: 0,
                red: 0,
            });
        };

        if (spinning) setDisabled(true);
    }, [spinning]);

    const handleClick = () => {
        // cant bet twice
        setDisabled(true);
    
        // adjust money
        const current = context.money;
        // if the user does not have enough then return error
        const adjusted = current - (bets.red + bets.black + bets.green);
        if (adjusted < 0) {
            // if not enough money then reset and return
            setBets({
                black: 0,
                green: 0,
                red: 0,
            });
            setDisabled(false);
            return;
        };

        // set new money and emit the bet
        setContext(prev => {
            prev.money = adjusted;
            return { ...prev };
        });

        socket.emit("others", {
            username: localStorage.getItem("username") ?? "?",
            bets: bets
        });
        console.log({ bets });
    };

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
                        disabled={disabled}

                        onClick={handleClick}
                    >
                        Bet
                    </Button>
                </div>

                <div style={{ height: 10 }} />

                {/** bottom part */}
                <div className={classes.bottom}>
                    
                    {/** black */}
                    <div className={classes.inner}>
                        <TextField
                            type="number"
                            color="secondary"

                            value={bets.black}
                            onChange={(e) => {
                                if (e.target.value.includes("-")) return;
                                if (disabled) return;
                                setBets(prev => {
                                    prev.black = Number(e.target.value);
                                    return { ...prev };
                                });
                            }}

                            helperText={`Current: ${bets.black}`}
                            label="Black ⚫"
                        />
                        <Divider />

                        {/** current bets */}
                        {others.map(value => {
                            return (<>
                                {value.bets.black !== 0 && (<>
                                    <div>
                                        <Typography>{value.username}:</Typography>
                                        <Typography>{value.bets.black}</Typography>
                                    </div>
                                    <Divider />
                                </>)}
                            </>)
                        })}
                    </div>

                    {/** green */}
                    <div className={classes.inner}>
                        <TextField
                            type="number"
                            color="secondary"
                            
                            value={bets.green}
                            onChange={(e) => {
                                if (e.target.value.includes("-")) return;
                                if (disabled) return;
                                setBets(prev => {
                                    prev.green = Number(e.target.value);
                                    return { ...prev };
                                });
                            }}

                            helperText={`Current: ${bets.green}`}
                            label="Green 🟢"
                        />
                        <Divider />

                        {/** current bets */}
                        {others.map(value => {
                            return (<>
                                {value.bets.green !== 0 && (<>
                                    <div>
                                        <Typography>{value.username}:</Typography>
                                        <Typography>{value.bets.green}</Typography>
                                    </div>
                                    <Divider />
                                </>)}
                            </>)
                        })}
                    </div>

                    {/** red */}
                    <div className={classes.inner}>
                        <TextField
                            type="number"
                            label="Red 🔴"
                            color="secondary"
                        
                            value={bets.red}
                            onChange={(e) => {
                                if (e.target.value.includes("-")) return;
                                if (disabled) return;
                                setBets(prev => {
                                    prev.red = Number(e.target.value);
                                    return { ...prev };
                                });
                            }}

                            helperText={`Current: ${bets.red}`}
                        />
                        <Divider />

                        {/** current bets */}
                        {others.map(value => {
                            return (<>
                                {value.bets.red !== 0 && (<>
                                    <div>
                                        <Typography>{value.username}:</Typography>
                                        <Typography>{value.bets.red}</Typography>
                                    </div>
                                    <Divider />
                                </>)}
                            </>)
                        })}
                    </div>
                </div>

            </Paper>
        </div>
    );
};
export default Betting;