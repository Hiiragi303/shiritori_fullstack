const express = require("express");
const cors = require("cors");
const { initTokenizer } = require("./services/normalizer");

const app = express();
const port = process.env.PORT || 3000;

// CORS設定
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

// ルート登録
app.use("/api/session", require("./routes/session"));
app.use("/api/turn", require("./routes/turn"));

// health
app.get("/api/health", (req, res) => res.send("ok"));

initTokenizer().then(() => {
    app.listen(port, () => {
        console.log(`server start at http://localhost:${port}`);
    });
})
