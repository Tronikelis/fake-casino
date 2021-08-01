import { FC, useState, useEffect, useContext } from "react";

import { CssBaseline } from "@material-ui/core";
import io from "socket.io-client";

// my custom components
import Signup from "./signup";
import App from "./app";

// misc context
import Context, { Provider } from "./app/context";

// initialize socket.io (web-sockets) awesome thing
const socket = io();

// main entry for the casino
const Entry: FC = () => {

    // is user signed in state
    const [signedIn, setSignedIn] = useState(false);

    // context state
    const { context, setContext } = useContext(Context);

    // first time set the money
    useEffect(() => {
        // set money if empty
        if (!localStorage.getItem("money")) {
            localStorage.setItem("money", "1500");

            setContext(prev => {
                prev.money = 1500;

                return { ...prev };
            });
        };

        // cleanup to set money when user leaves
        return () => {
            localStorage.setItem(
                "money",
                context.money.toString(),
            );
        };
    }, []);

    return (<>
        <CssBaseline>
            {/** provide context for everything */}
            <Provider>

                {/** show signup screen if the user hasn't done that yet */}

                {!signedIn ?
                    <Signup state={{ signedIn, setSignedIn }} /> :
                    <App socket={socket} />
                }

            </Provider>
        </CssBaseline>
    </>);
};
export default Entry;