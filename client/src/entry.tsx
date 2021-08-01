import { FC, useState } from "react";

import { CssBaseline } from "@material-ui/core";
import io from "socket.io-client";

// my custom components
import Signup from "./signup";
import App from "./app";

// initialize socket.io (web-sockets) awesome thing
const socket = io();

// main entry for the casino
const Entry: FC = () => {

    // is user signed in state
    const [signedIn, setSignedIn] = useState(false);

    return (<>
        <CssBaseline>
            {/** show signup screen if the user hasn't done that yet */}

            {!signedIn ?
                <Signup state={{ signedIn, setSignedIn }} /> :
                <App socket={socket} />
            }

        </CssBaseline>
    </>);
};
export default Entry;