const express = require("express");
const app = express();
const port = 3000;

app.get("/api/health", (req, res) => {
    res.send("ok");
});

app.listen(port, () => {
    console.log(`server start at http:localhost:${port}`);
});