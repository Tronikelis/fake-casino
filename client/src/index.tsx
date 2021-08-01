import * as React from "react";
import ReactDOM from "react-dom";

import Entry from "./entry";

import { createTheme, ThemeProvider } from "@material-ui/core";
const theme = createTheme({
    palette: {
        type: "dark",
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Entry />
    </ThemeProvider>,
    document.getElementById("root")
);