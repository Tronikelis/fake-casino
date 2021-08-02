import { FC, useState, useEffect, useContext, Dispatch, SetStateAction } from "react";

import { createStyles, makeStyles, Typography } from "@material-ui/core";
import { Wheel } from "react-custom-roulette";
import { Socket } from "socket.io-client";

// context
import Context from "../context";

interface RouletteProps {
    socket: Socket
    state: {
        spinning: boolean;
        setSpinning: Dispatch<SetStateAction<boolean>>

        prize: number;
        setPrize: Dispatch<SetStateAction<number>>
    };
};

const useStyles = makeStyles(theme => createStyles({
    root: {
        width: "100%",
        height: "100%",
        
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "align",
    },
    wheel: {
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
    },
}));

// wheel data
const data = [
    { option: "0" },
    { option: "1" },
    { option: "2" },
    { option: "3" },
    { option: "4" },
    { option: "5" },
    { option: "6" },
    { option: "7" },
    { option: "8" },
    { option: "9" },
    { option: "10" },
    { option: "11" },
    { option: "12" },
    { option: "13" },
    { option: "14" },
];
const backgroundColors = [
    "#04853b",
    "#3e3e3e", "#df3428",
    "#3e3e3e", "#df3428",
    "#3e3e3e", "#df3428",
    "#3e3e3e", "#df3428",
    "#3e3e3e", "#df3428",
    "#3e3e3e", "#df3428",
    "#3e3e3e", "#df3428",
];

const Roulette: FC<RouletteProps> = ({ socket, state }) => {
    const classes = useStyles();

    const { setSpinning, spinning, prize, setPrize } = state;
    const [time, setTime] = useState(0);

    // for setting last spin
    const { setContext } = useContext(Context);


    useEffect(() => {
        interface Result {
            prize: number;
            spin: boolean;
        };

        // wheel state from the server
        socket.on("wheel", (res: Result) => {
            // set the prize and start spinning
            setPrize(res.prize);
            setSpinning(res.spin);
        });

        // synchronize time
        socket.on("time", (res: { timer: number }) => {
            setTime(res.timer);
        });
    }, []);

    // callback when the wheel stops
    const handleStop = () => {
        // stop the spinning
        setSpinning(false);

        // set previous spin
        if (prize === 0) {
            setContext(prev => {
                prev.previous = "🟢";
                return { ...prev };
            });
            return;
        };
        
        const color = prize % 2 === 0 ? "🔴" : "⚫"
        setContext(prev => {
            prev.previous = color;
            return { ...prev };
        });
    };

    return (<>
        <div className={classes.root}>

            <div>
                <Typography variant="h4" gutterBottom align="center">
                    Spinning in: {25 - time}
                </Typography>

                <div className={classes.wheel}>
                    <Wheel
                        data={data}
                        mustStartSpinning={spinning}
                        onStopSpinning={handleStop}
                        prizeNumber={prize}
                        
                        backgroundColors={backgroundColors}
                        textColors={['#ffffff']}
                    />
                </div>
            </div>
            
        </div>
    </>);
};
export default Roulette;
