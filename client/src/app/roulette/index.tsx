import { FC, useState, useEffect } from "react";

import { createStyles, makeStyles, Typography } from "@material-ui/core";
import { Wheel } from "react-custom-roulette";
import { Socket } from "socket.io-client";

interface RouletteProps {
    socket: Socket
};

const useStyles = makeStyles(theme => createStyles({
    root: {
        width: "100%",
        height: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
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

const Roulette: FC<RouletteProps> = ({ socket }) => {
    const classes = useStyles();

    const [prize, setPrize] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [time, setTime] = useState(0);

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
        setSpinning(false);

        const color = prize % 2 === 0 ? "red" : "black"
        alert("Prize is -> " + color);
    };

    return (<>
        <div className={classes.root}>
            <Typography variant="h4" gutterBottom>
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
    </>);
};
export default Roulette;
