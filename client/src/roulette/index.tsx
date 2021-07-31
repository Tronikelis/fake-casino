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
}));

const Roulette: FC<RouletteProps> = ({ socket }) => {
    const classes = useStyles();

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
    ];

    const [prize, setPrize] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        interface Result {
            prize: number;
            spin: boolean;
        };

        // when to spin
        socket.on("wheel", (res: Result) => {
            setPrize(res.prize);
            console.log(res.prize);

            setSpinning(res.spin);
        });

        socket.on("time", (res: { timer: number }) => {
            setTime(res.timer);
        });
    }, []);

    return (<>
        <div className={classes.root}>
            <Wheel
                data={data}
                mustStartSpinning={spinning}
                onStopSpinning={() => setSpinning(false)}
                prizeNumber={prize}

                backgroundColors={['#3e3e3e', '#df3428']}
                textColors={['#ffffff']}
            />

            <Typography align="center" variant="h4">
                Spinning in: {20 - time}
            </Typography>
        </div>
    </>);
};
export default Roulette;
