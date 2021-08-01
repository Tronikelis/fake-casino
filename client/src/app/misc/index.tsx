import { FC } from "react";

import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => createStyles({
    root: {

    },
}));

const Misc: FC = () => {
    return (
        <div>Money {localStorage.getItem("money")}</div>
    );
};
export default Misc;