import { Application } from "express";

export default function (app: Application, root: string) {
    app.get("/", (req, res) => {
        return res.sendFile(root + "/index.html");
    });
}
