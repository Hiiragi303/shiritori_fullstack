const { normalizeWord } = require("./normalizer");
const { getSession } = require("./sessionStore");

function handleTurn(req, res) {
    const { sessionId, userWord } = req.body ?? {};
    if (typeof sessionId !== "string" || typeof userWord !== "string") {
        return res.status(400).json({ error: "Bad Request" });
    }

    const normalized = normalizeWord(userWord);
    const session = getSession(sessionId);
    console.log(`[TURN] ${sessionId}: ${userWord} -> ${normalized}`);

    let reply = "リンゴ";
    let valid = true;

    // 既出語チェック
    if (session.words.includes(normalized)) {
        reply = null;
        valid = false;
    } else {
        session.words.push(normalized);
    }

    // 「ン」の判定
    if (normalized.endsWith("ン")) {
        reply = null;
        valid = false;
    }

    return res.json({ reply, valid });
}

module.exports = { handleTurn };
