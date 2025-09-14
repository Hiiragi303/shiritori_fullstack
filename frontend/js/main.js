const BASE = "http://localhost:3000";
const $ = (id) => document.getElementById(id);
let sessionId = null;

$("check").addEventListener("click", async () => {
    try {
        const res = await fetch(`${BASE}/api/health`);
        $("result").textContent = await res.text();  // "ok"
    } catch (e) {
        $("result").textContent = "エラー: " + e;
    }
});

$("new-session").addEventListener("click", async () => {
    try {
        const res = await fetch(`${BASE}/api/session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        });
        const data = await res.json();
        sessionId = data.sessionId;
        $("sid").textContent = sessionId;
        $("send").disabled = false;
    } catch (e) {
        $("sid").textContent = "セッション作成失敗: " + e;
    }
});

$("send").addEventListener("click", async () => {
    if (!sessionId) return ($("out").textContent += "\n(先にセッションを作って)");
    const userWord = $("word").value || "";
    try {
        const res = await fetch(`${BASE}/api/turn`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, userWord })
        });
        const data = await res.json();
        $("out").textContent += `\n> ${userWord}\n< ${data.reply}`;
        $("word").value = "";
    } catch (e) {
        $("out").textContent += `\n(送信エラー) ${e}`;
    }
})