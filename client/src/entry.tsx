import { FC, useState, useEffect, useContext } from "react";

import { CssBaseline } from "@material-ui/core";

// my custom components
import Signup from "./signup";
import App from "./app";

// misc context
import Context, { Provider } from "./app/context";



// main entry for the casino
const Entry: FC = () => {

    // is user signed in state
    const [signedIn, setSignedIn] = useState(false);

    // context state
    const { context, setContext } = useContext(Context);

    // first time set the money
    useEffect(() => {
        // set money if empty and update if not
        if (!localStorage.getItem("money")) {
            localStorage.setItem("money", "1500");

            setContext(prev => {
                prev.money = 1500;

                return { ...prev };
            });
        } else {
            setContext(prev => {
                prev.money = Number(localStorage.getItem("money") ?? 15);
                return { ...prev };
            });
        };
    }, []);

    return (<>
        <CssBaseline>
            {/** provide context for everything */}
            <Provider>

                {/** show signup screen if the user hasn't done that yet */}

                {!signedIn ?
                    <Signup state={{ signedIn, setSignedIn }} /> :
                    <App />
                }

            </Provider>
        </CssBaseline>
    </>);
};
export default Entry;