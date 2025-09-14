import { SpeechInput } from './speech.js';

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

let busy = false;
async function sendTurn(userWord) {
    if (!sessionId) {
        $("turn-caution").textContent = "\n(先にセッションを作って)";
        return;
    }
    $("turn-caution").textContent = '';
    if (!userWord) return;
    if (busy) return;
    busy = true;
    $("send").disabled = true;
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
        $("turn-caution").textContent += `\n(送信エラー) ${e}`;
    } finally {
        busy = false;
        $("send").disabled = false;
    }
}

$("send").addEventListener("click", async () => {
    const userWord = $("word").value || "";
    await sendTurn(userWord);
});

/**
 * 音声認識部分
 */
let speech;
try {
    speech = new SpeechInput()
        .onState((s) => {
            $("speech-status").textContent = s;
            $("start-speech").disabled = (s === 'listening');
            $("stop-speech").disabled = (s !== 'listening');
        })
        .onInterim((t) => $("speech-interim").textContent = t)
        .onFinal(async (t) => {
            $("speech-final").textContent = t;
            $("word").value = t;
            $("speech-interim").textContent = '';
            await sendTurn(t);
        });
} catch (e) {
    console.log(e.message);
    $("speech-status").textContent = 'unsupported';
    $("start-speech").disabled = true;
}

$("start-speech")?.addEventListener("click", () => speech?.start());
$("stop-speech")?.addEventListener("click", () => speech?.stop());