const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3000;

// CORS
const corsOptions = {
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 204,
}
app.use(cors(corsOptions));
app.options(["/api/(.*)"], cors(corsOptions));

// jsonボディを受け取る
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.send("ok");
});

app.post("/api/session", (req, res) => {
    const sessionId = uuidv4();
    res.json({ sessionId });
});

app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`);
});