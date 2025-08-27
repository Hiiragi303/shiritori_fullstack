const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
}));

app.get("/api/health", (req, res) => {
    res.send("ok");
});

app.listen(port, () => {
    console.log(`server start at http:localhost:${port}`);
});