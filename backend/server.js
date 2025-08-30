const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = process.env.PORT || 3000;

// CORS
const corsOptions = {
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 204,
}
app.use(cors(corsOptions));
app.options("/^\/api\/.*$/", cors(corsOptions));

// jsonボディを受け取る
app.use(express.json());

// health
app.get("/api/health", (req, res) => {
    res.send("ok");
});

// session発行
app.post("/api/session", (req, res) => {
    const sessionId = uuidv4();
    res.json({ sessionId });
});

// ターン処理
app.post("/api/turn", (req, res) => {
    const { sessionId, userWord } = req.body ?? {};
    if (typeof sessionId !== "string" || typeof userWord !== "string") {
        return res.status(400).json({ error: "Bad Request" });
    }
    console.log(`[TURN] ${sessionId}: ${userWord}`);
    res.json({ reply: "りんご", valid: true });
});

app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`);
});