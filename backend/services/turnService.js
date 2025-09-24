const { normalizeWord } = require("./normalizer");

function handleTurn(req, res) {
    const { sessionId, userWord } = req.body ?? {};
    if (typeof sessionId !== "string" || typeof userWord !== "string") {
        return res.status(400).json({ error: "Bad Request" });
    }
    const normalized = normalizeWord(userWord);
    console.log(`[TURN] ${sessionId}: ${userWord} -> ${normalized}`);

    let reply = "りんご";
    let valid = true;

    // 「ン」の判定
    if (userWord.endsWith("ン")) {
        reply = null;
        valid = false;
    }
    res.json({ reply, valid });
}

module.exports = { handleTurn };
