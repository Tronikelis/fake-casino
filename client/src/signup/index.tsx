import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";

import {
    Button, createStyles, makeStyles, TextField
} from "@material-ui/core";


interface SignupProps {
    state: {
        signedIn: boolean;
        setSignedIn: Dispatch<SetStateAction<boolean>>;
    };
};

const useStyles = makeStyles(theme => createStyles({
    root: {
        width: "100%",
        height: "100%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
}));

const Signup: FC<SignupProps> = ({ state }) => {
    const classes = useStyles();
    
    // signed in state
    const { setSignedIn } = state;
    // current username state
    const [input, setInput] = useState("");
    // button is disabled ?
    const [disabled, setDisabled] = useState(false);

    // see if already signed in
    useEffect(() => {
        // get current username
        const username = localStorage.getItem("username");

        // username exists ? set state to true else do nothing
        if (username) setSignedIn(true);
    }, []);

    const handleClick = () => {
        // max username length is 25
        if (input.length > 25) return;

        setDisabled(true);
        // set username
        localStorage.setItem("username", input);
        // set money
        localStorage.setItem("money", "1500");

        // user is now signed in
        setSignedIn(true);
    };

    return (
        <div className={classes.root}>
            <div>
                {/** username text input */}
                <TextField
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    variant="outlined"
                    label="Username"
                />
            </div>

            <div style={{ width: 20 }} />

            <div>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={disabled}
                    onClick={handleClick}
                >
                    Enter
                </Button>
            </div>
        </div>
    );
};
export default Signup;